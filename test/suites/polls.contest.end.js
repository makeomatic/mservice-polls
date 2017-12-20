const assert = require('assert');
const Chance = require('chance');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');
const indexOf = require('lodash/indexOf');

const chance = new Chance();
const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/contest/end',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.contest.end', function suite() {
  before('start up service', () => polls.connect());

  before('create contest with no questions', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      state: polls.service('contest').constructor.state.STOPPED,
      startedAt: new Date(),
    };

    return polls
      .service('contest')
      .create(params)
      .tap(contest => (this.contestNoQuestions = contest));
  });

  before('create user subscription', () => polls
    .service('usersContest')
    .save(this.contestNoQuestions.get('id'), 'user@foo.com')
  );

  before('create user subscription', () => polls
    .service('usersContest')
    .save(this.contestNoQuestions.get('id'), 'user@bar.com')
  );

  before('create contest with questions', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      hasQuestions: true,
      state: polls.service('contest').constructor.state.STOPPED,
      startedAt: new Date(),
    };

    return polls
      .service('contest')
      .create(params)
      .tap(contest => (this.contestWithQuestions = contest));
  });

  before('create poll', () => {
    const params = {
      title: 'What is the best team ever?',
      ownerId: 'owner@poll.com',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
      contestId: this.contestWithQuestions.get('id'),
    };

    return polls
      .service('polls')
      .create(params)
      .tap(poll => (this.poll = poll));
  });

  before('create answer', () => {
    const params = {
      title: 'Toronto FC',
      pollId: this.poll.get('id'),
      position: 1,
    };

    return polls
      .service('answers')
      .create(params)
      .tap(answer => (this.answerFirst = answer));
  });

  before('create answer', () => {
    const params = {
      title: 'Seattle Sounders',
      pollId: this.poll.get('id'),
      position: 0,
    };

    return polls
      .service('answers')
      .create(params)
      .tap(answer => (this.answerSecond = answer));
  });

  before('create user answer', () => polls
    .service('usersAnswers')
    .save(this.answerSecond.get('id'), chance.email())
  );

  before('create user answer', () => polls
    .service('usersAnswers')
    .save(this.answerSecond.get('id'), chance.email())
  );

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
      uri: 'http://localhost:3000/api/polls/contest/end',
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
    const payload = { id: this.contestNoQuestions.get('id') };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Hasn\'t access');
      });
  });

  it('should be able to end contest without questions', () => {
    const headers = authHeader(this.rootToken);
    const payload = { id: this.contestNoQuestions.get('id') };

    return http({ headers, body: payload })
      .then(({ body }) => {
        const { id, type, attributes, relations: { users } } = body.data;
        const { winners } = attributes.meta;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'contest');
        assert.equal(attributes.prize, 'Toronto FC Jersey');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, polls.service('contest').constructor.state.ENDED);
        assert.ok(isISODate(attributes.startedAt));
        assert.ok(isISODate(attributes.endedAt));
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
        assert.deepEqual(users.data, ['user@foo.com', 'user@bar.com']);

        // meta
        assert.equal(winners.length, 1);
        assert.ok(indexOf(users.data, winners[0]) != -1);
      });    
  });

  // rely on the previous one
  it('should be able to return error to end a contest if not stopped', () => {
    const headers = authHeader(this.rootToken);
    const payload = { id: this.contestNoQuestions.get('id') };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Can\'t end a contest that is not stopped');
      });
  });

  it('should be able to return error to end a contest with questions without an answer', () => {
    const headers = authHeader(this.rootToken);
    const payload = { id: this.contestWithQuestions.get('id') };

    return http({ headers, body: payload })
      .then(({ body }) => {
        assert.equal(body.statusCode, 403);
        assert.equal(body.message, 'An attempt was made to perform an operation that is not'
          + ' permitted: Can\'t end a contest with questions without an answer');
      }); 
  });

  it('should be able to end contest with questions', () => {
    const headers = authHeader(this.rootToken);
    const payload = {
      id: this.contestWithQuestions.get('id'),
      answerId: this.answerSecond.get('id'),
    };

    return http({ headers, body: payload })
      .then(({ body }) => {
        const { id, type, attributes, relations: { poll } } = body.data;
        const { winners } = attributes.meta;
        const { attributes: pollAttributes } = poll.data;

        assert.ok(Number.isInteger(id));
        assert.equal(type, 'contest');
        assert.equal(attributes.prize, 'Toronto FC Jersey');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, polls.service('contest').constructor.state.ENDED);
        assert.ok(isISODate(attributes.startedAt));
        assert.ok(isISODate(attributes.endedAt));
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));

        // meta
        assert.equal(winners.length, 1);

        // poll
        assert.ok(poll.data.id, this.poll.get('id'));
        assert.equal(poll.data.type, 'poll');
        assert.equal(pollAttributes.title, 'What is the best team ever?');
        assert.equal(pollAttributes.ownerId, 'owner@poll.com');
        assert.equal(pollAttributes.minUserAnswersCount, 1);
        assert.equal(pollAttributes.maxUserAnswersCount, 1);
      });    
  });
});
