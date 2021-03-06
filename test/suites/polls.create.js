const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/create',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.create', function suite() {
  before('start up service', () => polls.connect());

  before('create contest', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      hasQuestions: true,
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
      uri: 'http://localhost:3000/api/polls/create',
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
    const payload = { title: 'What is your favorite food?', ownerId: 'owner@poll.com' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to create poll', () => {
    const payload = {
      title: 'What is your favorite food?',
      ownerId: 'owner@poll.com',
      meta: { foo: 'bar' },
    };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { id, type, attributes, relations: { answers } } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'poll');
        assert.equal(attributes.title, 'What is your favorite food?');
        assert.equal(attributes.contestId, null);
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.equal(attributes.minUserAnswersCount, 1);
        assert.equal(attributes.maxUserAnswersCount, 1);
        assert.deepEqual(attributes.meta, { foo: 'bar' });
        assert.deepEqual(answers.data, []);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });

  it('should be able to create poll with contest parent', () => {
    const payload = {
      title: 'What is your favorite food?',
      ownerId: 'owner@poll.com',
      contestId: this.contest.get('id'),
      meta: { foo: 'bar' },
    };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { id, type, attributes, relations: { answers } } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'poll');
        assert.equal(attributes.title, 'What is your favorite food?');
        assert.equal(attributes.contestId, this.contest.get('id'));
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.equal(attributes.minUserAnswersCount, 1);
        assert.equal(attributes.maxUserAnswersCount, 1);
        assert.deepEqual(attributes.meta, { foo: 'bar' });
        assert.deepEqual(answers.data, []);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });
});
