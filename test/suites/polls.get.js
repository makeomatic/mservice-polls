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
      title: 'What is your favorite cat?',
      pollId: this.poll.get('id'),
    };

    return polls
      .service('answers')
      .create(params)
      .tap(answer => (this.answer = answer));
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
        const answer = answers.data[0];

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
        assert.equal(answers.data.length, 1);
        assert.equal(answer.id, this.answer.get('id'));
        assert.equal(answer.type, 'pollAnswer');
        assert.equal(answer.attributes.title, 'What is your favorite cat?');
        assert.equal(answer.attributes.pollId, this.poll.get('id'));
        assert.equal(answer.attributes.position, 0);
        assert.ok(isISODate(answer.attributes.createdAt));
        assert.ok(isISODate(answer.attributes.updatedAt));
      });
  });
});
