const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/contest/delete',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.contest.delete', function suite() {
  before('start up service', () => polls.connect());

  before('create contest', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
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
      uri: 'http://localhost:3000/api/polls/contest/delete',
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

    return http({ headers, body: { id: this.contest.get('id') } })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.rootToken);

    return http({ headers, body: { id: this.contest.get('id'), ownerId: 'owner@id.com' } })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.contest.delete.request validation failed: data should NOT'
          + ' have additional properties');
      });
  });

  it('should be able to delete contest', () => {
    const payload = { id: this.contest.get('id') };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { meta } = body;
        assert.deepEqual(meta, { status: 'success' });
      });
  });

  it('should be able to return error if contest started', () => {
    const serviceContest = polls.service('contest');
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      state: serviceContest.constructor.state.STARTED,
    };

    return serviceContest
      .create(params)
      .then((contest) => {
        const headers = authHeader(this.rootToken);

        return http({ headers, body: { id: contest.get('id') } });
      })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Can\'t delete contest that have started');
      });
  });
});
