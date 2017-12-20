const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/unvote',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.unvote', function suite() {
  before('start up service', () => polls.connect());

  before('create poll', () => {
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minUserAnswersCount: 2,
      maxUserAnswersCount: 3,
      state: 1,
    };

    return polls
      .service('polls')
      .create(params)
      .tap(poll => (this.poll = poll));
  });

  before('create answer', () => {
    const params = {
      title: 'Perchik',
      pollId: this.poll.get('id'),
    };

    return polls
      .service('answers')
      .create(params)
      .tap(answer => (this.answerFirst = answer));
  });

  before('create answer', () => {
    const params = {
      title: 'Dexter',
      pollId: this.poll.get('id'),
    };

    return polls
      .service('answers')
      .create(params)
      .tap(answer => (this.answerSecond = answer));
  });

  before('create user answer', () => polls
    .service('usersAnswers')
    .save(this.answerFirst.get('id'), 'user@foo.com')
  );

  before('login user', () =>
    authHelper
      .call(polls, 'user@foo.com', 'userpassword000000')
      .tap(({ jwt }) => (this.userToken = jwt))
  );

  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/unvote',
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

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.userToken);
    const payload = { id: 'catcatcat' };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.unvote.request validation failed:'
          + ' data.id should be integer');
      });
  });

  it('should be able to return error if not authorized', () => {
    const payload = {
      id: this.poll.get('id'),
    };

    return http({ body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Auth required');
      });
  });

  it('should be able to return error if poll ended', () => {
    const servicePolls = polls.service('polls');
    const params = {
      title: 'What is your favorite cat?',
      ownerId: 'owner@poll.com',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
      state: servicePolls.constructor.state.ENDED,
    };

    return servicePolls
      .create(params)
      .then((poll) => {
        const headers = authHeader(this.userToken);
        const body = { id: poll.get('id') };

        return http({ headers, body });
      })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Voting is not started');
      });
  });

  it('should be able to un vote', () => {
    const payload = {
      id: this.poll.get('id'),
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        const { meta } = body;

        assert.deepEqual(meta, { status: 'success' });
      });
  });
});
