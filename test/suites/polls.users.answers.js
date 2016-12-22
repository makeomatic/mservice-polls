const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/users/answers',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'get',
});

const polls = new Polls(config);

describe('polls.users.answers', function suite() {
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
      uri: 'http://localhost:3000/api/polls/users/answers',
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      method: 'post',
    };

    return request(params)
      .then(({ body }) => {
        assert.equal(body.statusCode, 500);
        assert.equal(body.name, 'NotSupportedError');
      });
  });

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.userToken);
    const qs = { id: '12cat' };

    return http({ headers, qs })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.users.answers.request validation failed: data.id'
          + ' should match pattern "^\\d+$"');
      });
  });

  it('should be able to get answers of the poll by user', () => {
    const qs = { id: this.poll.get('id') };

    return http({ qs, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        const { data, meta } = body;

        assert.equal(data.length, 2);
        meta.answers.forEach((answer) => {
          if (answer.id === this.answerFirst.get('id')) {
            assert.equal(answer.votesCount, 1);
            assert.equal(answer.userAnswered, true);
          } else {
            assert.equal(answer.votesCount, 0);
            assert.equal(answer.userAnswered, false);
          }
        });
      });
  });

  it('should be able to get answers of the poll by guest', () => {
    const qs = { id: this.poll.get('id') };

    return http({ qs })
      .then(({ body }) => {
        const { data, meta } = body;

        assert.equal(data.length, 2);
        meta.answers.forEach((answer) => {
          if (answer.id === this.answerFirst.get('id')) {
            assert.equal(answer.votesCount, 1);
            assert.equal(answer.userAnswered, false);
          } else {
            assert.equal(answer.votesCount, 0);
            assert.equal(answer.userAnswered, false);
          }
        });
      });
  });
});
