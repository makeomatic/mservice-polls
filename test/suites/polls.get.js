const assert = require('assert');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/get',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'get',
});

const polls = new Polls(config);

describe('polls.update', function suite() {
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
      .tap(poll => (this.poll = poll));
  });

  before('create answer', () => {
    const params = {
      title: 'Foo',
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
      title: 'Bar',
      pollId: this.poll.get('id'),
      position: 0,
    };

    return polls
      .service('answers')
      .create(params)
      .tap(answer => (this.answerSecond = answer));
  });

  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/list',
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
    const qs = { id: this.poll.get('id') + 1 };

    return http({ qs })
      .then(({ body }) => {
        assert.equal(body.statusCode, 404);
        assert.equal(body.message, 'Not Found: "Entity \'Poll\' not found"');
      });
  });

  it('should be able to get poll', () => {
    const qs = { id: this.poll.get('id') };

    return http({ qs })
      .then(({ body }) => {
        const { id, type, attributes, relations: { answers } } = body.data;
        const [answerSecond, answerFirst] = answers.data;

        // id
        assert.equal(id, this.poll.get('id'));
        // type
        assert.equal(type, 'poll');
        // attributes
        assert.equal(attributes.title, 'What is your favorite cat?');
        assert.equal(attributes.ownerId, 'owner@poll.com');
        assert.equal(attributes.state, 0);
        assert.equal(attributes.minUserAnswersCount, 1);
        assert.equal(attributes.maxUserAnswersCount, 1);
        assert.equal(attributes.startedAt, null);
        assert.equal(attributes.endedAt, null);
        assert.ok(isISODate(attributes.createdAt));
        assert.ok(isISODate(attributes.updatedAt));
        // relations
        assert.equal(answers.data.length, 2);
        // first postion
        assert.equal(answerSecond.id, this.answerSecond.get('id'));
        assert.equal(answerSecond.type, 'pollAnswer');
        assert.equal(answerSecond.attributes.title, 'Bar');
        assert.equal(answerSecond.attributes.pollId, this.poll.get('id'));
        assert.equal(answerSecond.attributes.position, 0);
        assert.ok(isISODate(answerSecond.attributes.createdAt));
        assert.ok(isISODate(answerSecond.attributes.updatedAt));
        // second postion
        assert.equal(answerFirst.id, this.answerFirst.get('id'));
        assert.equal(answerFirst.type, 'pollAnswer');
        assert.equal(answerFirst.attributes.title, 'Foo');
        assert.equal(answerFirst.attributes.pollId, this.poll.get('id'));
        assert.equal(answerFirst.attributes.position, 1);
        assert.ok(isISODate(answerFirst.attributes.createdAt));
        assert.ok(isISODate(answerFirst.attributes.updatedAt));
      });
  });
});
