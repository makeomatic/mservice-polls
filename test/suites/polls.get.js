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
      minAnswersCount: 1,
      maxAnswersCount: 1,
    };

    return polls
      .service('polls')
      .create(params)
      .tap(poll => (this.poll = poll));
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
        const { id, type, attributes } = body.data;

        assert.equal(id, this.poll.get('id'));
        assert.equal(type, 'poll');
        assert.equal(attributes.title, 'What is your favorite cat?');
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
});
