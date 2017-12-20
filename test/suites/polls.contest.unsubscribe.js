const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/contest/unsubscribe',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.contest.unsubscribe', function suite() {
  before('start up service', () => polls.connect());

  before('create contest with no questions', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      state: 1,
    };

    return polls
      .service('contest')
      .create(params)
      .tap(contest => (this.contestNoQuestions = contest));
  });

  before('create contest with questions', () => {
    const params = {
      prize: 'Toronto Blue Jays Jersey',
      ownerId: 'owner@poll.com',
      state: 1,
      hasQuestions: true,
    };

    return polls
      .service('contest')
      .create(params)
      .tap(contest => (this.contestWithQuestions = contest));
  });

  before('login user', () =>
    authHelper
      .call(polls, 'user@foo.com', 'userpassword000000')
      .tap(({ jwt }) => (this.userToken = jwt))
  );

  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/contest/unsubscribe',
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

  it('should be able to return error if not authorized', () => {
    const payload = {
      id: this.contestNoQuestions.get('id'),
    };

    return http({ body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Auth required');
      });
  });

  it('should be able to return error if invalid params', () => {
    const payload = {
      id: null,
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.contest.unsubscribe.request validation failed: data.id'
          + ' should be integer');
      });
  });

  it('should be able to return error if contest has questions', () => {
    const payload = {
      id: this.contestWithQuestions.get('id'),
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Contest has questions and can\'t be subscribed/unsubscribe');
      });
  });

  it('should be able to unsubscribe', () => {
    const payload = {
      id: this.contestNoQuestions.get('id'),
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        const { meta } = body;

        assert.deepEqual(meta, { status: 'success' });
      });   
  });
});