const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/contest/update',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.contest.update', function suite() {
  before('start up service', () => polls.connect());

  before('create contes', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      onlyFollowers: false,
      nWinners: 1,
    };

    return polls
      .service('contest')
      .create(params)
      .tap((contest) => { this.contest = contest; });
  });

  before('login admin', () =>
    authHelper
      .call(polls, 'root@foo.com', 'rootpassword000000')
      .tap(({ jwt }) => { this.rootToken = jwt; })
  );

  before('login second admin', () =>
    authHelper
      .call(polls, 'secondroot@foo.com', 'rootpassword000000')
      .tap(({ jwt }) => { this.secondRootToken = jwt; })
  );

  before('login user', () =>
    authHelper
      .call(polls, 'user@foo.com', 'userpassword000000')
      .tap(({ jwt }) => { this.userToken = jwt; })
  );

  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/contest/update',
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      method: 'get',
    };

    return request(params)
      .then(({ body }) => {
        assert.equal(body.statusCode, 500);
        assert.equal(body.name, 'NotSupportedError');
      });
  });

  it('should be able to return error if invalid role', () => {
    const headers = authHeader(this.userToken);

    return http({ headers })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Invalid roles');
      });
  });

  it('should be able to return error if has not access', () => {
    const headers = authHeader(this.secondRootToken);
    const payload = { id: this.contest.get('id'), prize: 'Blue Jays Jersey' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.rootToken);
    const payload = { id: this.contest.get('id'), ownerId: 'owner@id.com' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.contest.update.request validation failed: data should NOT'
          + ' have additional properties');
      });
  });

  it('should be able to update contest', () => {
    const payload = {
      id: this.contest.get('id'),
      prize: 'Blue Jays Jersey',
      meta: { bar: 'baz' },
      onlyFollowers: true,
      nWinners: 2,
    };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { id, type, attributes, relations: { users, poll } } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'contest');
        assert.equal(attributes.prize, 'Blue Jays Jersey');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.equal(attributes.onlyFollowers, true);
        assert.equal(attributes.nWinners, 2);
        assert.deepEqual(attributes.meta, { bar: 'baz' });
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
        assert.deepEqual(users.data, []);
        assert.equal(poll.data.type, 'poll');
      });
  });

  it('should be able to return error if contest ended', () => {
    const serviceContest = polls.service('contest');
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      onlyFollowers: false,
      nWinners: 1,
      state: serviceContest.constructor.state.ENDED,
    };

    return serviceContest
      .create(params)
      .then((contest) => {
        const headers = authHeader(this.rootToken);
        const body = { id: contest.get('id'), prize: 'Blue Jays Jersey' };

        return http({ headers, body });
      })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Can\'t modify contest that have ended');
      });
  });
});
