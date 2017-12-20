const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/delete',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.delete', function suite() {
  before('start up service', () => polls.connect());

  before('create poll', () => {
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
    };

    return polls
      .service('polls')
      .create(params)
      .tap((poll) => { this.poll = poll; });
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
      uri: 'http://localhost:3000/api/polls/delete',
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

    return http({ headers, body: { id: this.poll.get('id') } })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.rootToken);

    return http({ headers, body: { id: this.poll.get('id'), ownerId: 'owner@id.com' } })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.delete.request validation failed: data should NOT'
          + ' have additional properties');
      });
  });

  it('should be able to delete poll', () => {
    const payload = { id: this.poll.get('id') };

    return http({ body: payload, headers: authHeader(this.rootToken) })
      .then(({ body }) => {
        const { meta } = body;
        assert.deepEqual(meta, { status: 'success' });
      });
  });

  it('should be able to return error if poll started', () => {
    const servicePolls = polls.service('polls');
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
      state: servicePolls.constructor.state.STARTED,
    };

    return servicePolls
      .create(params)
      .then((poll) => {
        const headers = authHeader(this.rootToken);

        return http({ headers, body: { id: poll.get('id') } });
      })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Can\'t delete poll that have started');
      });
  });
});
