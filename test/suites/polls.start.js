const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/start',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.start', function suite() {
  before('start up service', () => polls.connect());

  before('create poll with state created', () => {
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
    };

    return polls
      .service('polls')
      .create(params)
      .tap(poll => (this.createdPoll = poll));
  });

  before('create poll with state stoped', () => {
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
      state: polls.service('polls').constructor.state.STOPED,
    };

    return polls
      .service('polls')
      .create(params)
      .tap(poll => (this.stopedPoll = poll));
  });

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
      uri: 'http://localhost:3000/api/polls/start',
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
    const payload = { id: this.createdPoll.get('id') };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.rootToken);
    const payload = { id: this.createdPoll.get('id'), ownerId: 'owner@id.com' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.start.request validation failed: data should NOT'
          + ' have additional properties');
      });
  });

  it('should be able to start poll with status created', () => {
    const payload = { id: this.createdPoll.get('id') };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { id, type, attributes, relations: { answers } } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'poll');
        assert.equal(attributes.title, 'What is your favorite cat?');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 1);
        assert.equal(attributes.minUserAnswersCount, 1);
        assert.equal(attributes.maxUserAnswersCount, 1);
        assert.deepEqual(answers.data, []);
        assert.ok(isISODate(attributes.startedAt));
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });

  it('should be able to start poll with status stoped', () => {
    const payload = { id: this.stopedPoll.get('id') };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { id, type, attributes, relations: { answers } } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'poll');
        assert.equal(attributes.title, 'What is your favorite cat?');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 1);
        assert.equal(attributes.minUserAnswersCount, 1);
        assert.equal(attributes.maxUserAnswersCount, 1);
        assert.deepEqual(answers.data, []);
        assert.ok(isISODate(attributes.startedAt));
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });
});
