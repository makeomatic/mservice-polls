const assert = require('assert');
const Chance = require('chance');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const Promise = require('bluebird');
const request = require('request-promise');

const chance = new Chance();
const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/list',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'get',
});
const polls = new Polls(config);
const ownerIdFirst = chance.email();
const ownerIdSecond = chance.email();

describe('polls.list', function suite() {
  before('start up service', () => polls.connect());

  before('create polls', () => {
    const params = {
      title: 'What is your favorite cat?',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
    };
    const pollsParams = [
      Object.assign({}, params, { ownerId: ownerIdFirst, state: 2 }),
      Object.assign({}, params, { ownerId: ownerIdSecond, state: 1 }),
      Object.assign({}, params, { ownerId: ownerIdFirst, state: 1 }),
      Object.assign({}, params, { ownerId: ownerIdFirst, state: 3 }),
    ];

    return Promise
      .mapSeries(
        pollsParams,
        poll => polls.service('polls').create(poll)
      )
      .spread((first, second, third, four) => {
        this.pollFirst = first;
        this.pollSecond = second;
        this.pollThird = third;
        this.pollFour = four;
      });
  });

  before('create answer', () => {
    const params = {
      title: 'What is your favorite cat?',
      pollId: this.pollFirst.get('id'),
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

  it('should be able to return list of polls', () =>
    http()
      .then(({ body }) => {
        assert.equal(body.data.length > 0, true);
      })
  );

  it('should be able to filter polls by owner id', () => {
    const qs = { filter: { ownerId: ownerIdSecond } };

    return http({ qs })
      .then(({ body }) => {
        assert.equal(body.data.length === 1, true);
      });
  });

  it('should be able to filter polls by state (one state)', () => {
    const qs = { filter: { ownerId: ownerIdFirst, state: 2 } };

    return http({ qs })
      .then(({ body }) => {
        assert.equal(body.data.length === 1, true);
        assert.equal(body.data[0].id, this.pollFirst.get('id'));
      });
  });

  it('should be able to filter polls by state (many states)', () => {
    const uri = 'http://localhost:3000/api/polls/list' +
      `?filter[ownerId]=${ownerIdFirst}&filter[state]=1&filter[state]=2`;

    return http({ uri })
      .then(({ body }) => {
        assert.equal(body.data.length === 2, true);
        assert.equal(body.data[0].id, this.pollThird.get('id'));
        assert.equal(body.data[1].id, this.pollFirst.get('id'));
      });
  });

  it('should be able to sort polls', () => {
    const qs = {
      filter: { ownerId: ownerIdFirst, state: [1, 2] },
      sort: '-state,id',
      page: {
        size: 1,
      },
    };

    return http({ qs })
      .then(({ body }) => {
        assert.equal(body.data.length === 1, true);
        assert.equal(body.data[0].id, this.pollFirst.get('id'));
      });
  });

  it('should be able to paginate polls', () => {
    const qs = { filter: { ownerId: ownerIdFirst }, page: { size: 1, number: 3 } };

    return http({ qs })
      .then(({ body }) => {
        const answer = body.data[0].relations.answers.data[0];

        // id
        assert.equal(body.data[0].id, this.pollFirst.get('id'));
        // relations
        assert.equal(body.data[0].relations.answers.data.length, 1);
        assert.equal(answer.id, this.answer.get('id'));
        assert.equal(answer.type, 'pollAnswer');
        assert.equal(answer.attributes.title, 'What is your favorite cat?');
        assert.equal(answer.attributes.pollId, this.pollFirst.get('id'));
        assert.equal(answer.attributes.position, 0);
        assert.ok(isISODate(answer.attributes.createdAt));
        assert.ok(isISODate(answer.attributes.updatedAt));
      });
  });
});
