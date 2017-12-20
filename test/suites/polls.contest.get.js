const assert = require('assert');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/contest/get',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'get',
});

const polls = new Polls(config);

describe('polls.contest.get', function suite() {
  before('start up service', () => polls.connect());

  before('create contest with no questions', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
    };

    return polls
      .service('contest')
      .create(params)
      .tap((contest) => { this.contestNoQuestions = contest; });
  });

  before('create user subscription', () => polls
    .service('usersContest')
    .save(this.contestNoQuestions.get('id'), 'user@foo.com')
  );

  before('create contest with questions', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      hasQuestions: true,
    };

    return polls
      .service('contest')
      .create(params)
      .tap((contest) => { this.contestWithQuestions = contest; });
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
      .tap((poll) => { this.poll = poll; });
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
      .tap((answer) => { this.answerFirst = answer; });
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
      .tap((answer) => { this.answerSecond = answer; });
  });

  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/contest/get',
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

  it('should be able to return error if not found', () => {
    const qs = { id: this.contestWithQuestions.get('id') + 1 };

    return http({ qs })
      .then(({ body }) => {
        assert.equal(body.statusCode, 404);
        assert.equal(body.message, 'Not Found: "Entity \'Contest\' not found"');
      });
  });

  it('should be able to get contest with no questions', () => {
    const qs = { id: this.contestNoQuestions.get('id') };

    return http({ qs })
      .then(({ body }) => {
        const { id, type, attributes, relations: { users, poll } } = body.data;

        // id
        assert.equal(id, this.contestNoQuestions.get('id'));
        // type
        assert.equal(type, 'contest');
        // attributes
        assert.equal(attributes.prize, 'Toronto FC Jersey');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.deepEqual(users.data, ['user@foo.com']);
        assert.deepEqual(poll.data.attributes, {});
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
      });
  });

  it('should be able to get contest with questions', () => {
    const qs = { id: this.contestWithQuestions.get('id') };

    return http({ qs })
      .then(({ body }) => {
        const { id, type, attributes, relations: { users, poll } } = body.data;
        const { attributes: pollAttributes, relations: { answers } } = poll.data;

        // Contest
        assert.equal(id, this.contestWithQuestions.get('id'));
        assert.equal(type, 'contest');
        assert.equal(attributes.prize, 'Toronto FC Jersey');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.deepEqual(users.data, []);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));

        // Poll
        assert.ok(poll.data.id, this.poll.get('id'));
        assert.equal(poll.data.type, 'poll');
        assert.equal(pollAttributes.title, 'What is the best team ever?');
        assert.equal(pollAttributes.ownerId, 'owner@poll.com');
        assert.equal(pollAttributes.state, 0);
        assert.equal(pollAttributes.minUserAnswersCount, 1);
        assert.equal(pollAttributes.maxUserAnswersCount, 1);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));

        // Answers
        assert.equal(answers.data.length, 2);
      });
  });
});
