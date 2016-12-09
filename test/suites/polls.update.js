const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/update',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.update', function suite() {
  before('start up service', () => polls.connect());

  before('create poll', () => {
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minAnswersCount: 1,
      maxAnswersCount: 1,
    };

    return polls
      .service('polls')
      .create(params)
      .tap(poll => (this.poll = poll));
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
      uri: 'http://localhost:3000/api/polls/update',
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
    const payload = { id: this.poll.get('id'), title: 'What is your favorite food?' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.rootToken);
    const payload = { id: this.poll.get('id'), ownerId: 'owner@id.com' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.update.request validation failed: data should NOT'
          + ' have additional properties');
      });
  });

  it('should be able to update poll', () => {
    const payload = { id: this.poll.get('id'), title: 'What is your favorite food?' };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { id, type, attributes } = body.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'poll');
        assert.equal(attributes.title, 'What is your favorite food?');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.equal(attributes.minAnswersCount, 1);
        assert.equal(attributes.maxAnswersCount, 1);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });

  it('should be able to return error if poll ended', () => {
    const servicePolls = polls.service('polls');
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minAnswersCount: 1,
      maxAnswersCount: 1,
      state: servicePolls.constructor.state.ENDED,
    };

    return servicePolls
      .create(params)
      .then((poll) => {
        const headers = authHeader(this.rootToken);
        const body = { id: poll.get('id'), title: 'What is your favorite food?' };

        return http({ headers, body });
      })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Can\'t modify poll that have ended');
      });
  });
});
