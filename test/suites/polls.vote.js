const assert = require('assert');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/vote',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.vote', function suite() {
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
      .tap((poll) => { this.poll = poll; });
  });

  before('create answer', () => {
    const params = {
      title: 'Perchik',
      pollId: this.poll.get('id'),
    };

    return polls
      .service('answers')
      .create(params)
      .tap((answer) => { this.answerFirst = answer; });
  });

  before('create answer', () => {
    const params = {
      title: 'Dexter',
      pollId: this.poll.get('id'),
    };

    return polls
      .service('answers')
      .create(params)
      .tap((answer) => { this.answerSecond = answer; });
  });

  before('create answer', () => {
    const params = {
      title: 'Hate cats!',
      pollId: this.poll.get('id'),
    };

    return polls
      .service('answers')
      .create(params)
      .tap((answer) => { this.answerThird = answer; });
  });

  before('create answer', () => {
    const params = {
      title: 'I am a cat',
      pollId: this.poll.get('id'),
    };

    return polls
      .service('answers')
      .create(params)
      .tap((answer) => { this.answerFourth = answer; });
  });

  before('login user', () =>
    authHelper
      .call(polls, 'user@foo.com', 'userpassword000000')
      .tap(({ jwt }) => { this.userToken = jwt; })
  );

  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/vote',
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
      id: this.poll.get('id'),
      answersIds: [
        this.answerFirst.get('id'),
        this.answerSecond.get('id'),
        this.answerThird.get('id'),
        this.answerFourth.get('id'),
      ],
    };

    return http({ body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Auth required');
      });
  });

  it('should be able to return error if invalid params', () => {
    const headers = authHeader(this.userToken);
    const payload = {
      id: this.poll.get('id'),
      answersIds: this.answerFirst.get('id'),
    };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 400);
        assert.equal(body.message, 'polls.vote.request validation failed: data.answersIds'
          + ' should be array');
      });
  });

  it('should be able to return error if answers count less when expected', () => {
    const payload = {
      id: this.poll.get('id'),
      answersIds: [
        this.answerFirst.get('id'),
      ],
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Need more answers');
      });
  });

  it('should be able to return error if answers count more when expected', () => {
    const payload = {
      id: this.poll.get('id'),
      answersIds: [
        this.answerFirst.get('id'),
        this.answerSecond.get('id'),
        this.answerThird.get('id'),
        this.answerFourth.get('id'),
      ],
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Need less answers');
      });
  });

  it('should be able to return error if answers does not belong to poll', () => {
    const payload = {
      id: this.poll.get('id'),
      answersIds: [
        this.answerFirst.get('id') + 100,
        this.answerSecond.get('id') + 100,
      ],
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ` permitted: Answer #${this.answerFirst.get('id') + 100}`
          + ` doesn't belong to poll #${this.poll.get('id')}`);
      });
  });

  it('should be able to vote', () => {
    const payload = {
      id: this.poll.get('id'),
      answersIds: [
        this.answerFirst.get('id'),
        this.answerSecond.get('id'),
      ],
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        const { data, meta } = body;

        assert.equal(data.length, 4);
        assert.equal(meta.answers.length, 4);
        meta.answers.forEach((answer) => {
          if (answer.id === this.answerFirst.get('id')
            || answer.id === this.answerSecond.get('id')
          ) {
            assert.equal(answer.votesCount, 1);
            assert.equal(answer.userAnswered, true);
          } else {
            assert.equal(answer.votesCount, 0);
            assert.equal(answer.userAnswered, false);
          }
        });
      });
  });

  // depends on previous test
  it('should be able to return error if already answered', () => {
    const payload = {
      id: this.poll.get('id'),
      answersIds: [
        this.answerFirst.get('id'),
        this.answerSecond.get('id'),
      ],
    };

    return http({ body: payload, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Already answered');
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
        const body = { id: poll.get('id'), answersIds: [1] };

        return http({ headers, body });
      })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Voting is not started');
      });
  });
});
