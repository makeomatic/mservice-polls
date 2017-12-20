const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/contest/create',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('contest.create', function suite() {
  before('start up service', () => polls.connect());
  before('login admin', () =>
    authHelper
      .call(polls, 'root@foo.com', 'rootpassword000000')
      .tap(({ jwt }) => (this.rootToken = jwt))
  );
  before('login second admin', () =>
    authHelper
      .call(polls, 'secondroot@foo.com', 'rootpassword000000')
      .tap(({ jwt }) => (this.secondRootToken = jwt))
  );
  before('login user', () =>
    authHelper
      .call(polls, 'user@foo.com', 'userpassword000000')
      .tap(({ jwt }) => (this.userToken = jwt))
  );
  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/contest/create',
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
    const payload = { prize: 'Toronto FC Jersey', ownerId: 'owner@poll.com' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to create contest with no questions', () => {
    const payload = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      hasQuestions: false,
      meta: { foo: 'bar' },
    };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {

        const { id, type, attributes, relations: { users } } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'contest');
        assert.equal(attributes.prize, 'Toronto FC Jersey');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.ok(!attributes.hasQuestions);
        assert.deepEqual(attributes.meta, { foo: 'bar' });
        assert.deepEqual(users.data, []);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });

  it('should be able to create contest with questions', () => {
    const payload = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      hasQuestions: true,
      meta: { foo: 'bar' },
    };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {

        const { id, type, attributes, relations: { users } } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'contest');
        assert.equal(attributes.prize, 'Toronto FC Jersey');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.ok(attributes.hasQuestions);
        assert.deepEqual(attributes.meta, { foo: 'bar' });
        assert.deepEqual(users.data, []);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });
});
