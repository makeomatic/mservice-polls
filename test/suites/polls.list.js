const { auth: authHelper, authHeader } = require('../helpers/auth');
const assert = require('assert');
const Chance = require('chance');
const config = require('../configs/service');
const { isISODate } = require('../helpers/date');
const Polls = require('../../src');
const Promise = require('bluebird');
const request = require('request-promise');
const find = require('lodash/find');
const findIndex = require('lodash/findIndex');

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

  before('create contest', () => {
    const params = {
      prize: 'Toronto FC Jersey',
      ownerId: 'owner@poll.com',
      hasQuestions: true,
    };

    return polls
      .service('contest')
      .create(params)
      .tap(contest => (this.contest = contest));
  });

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
      Object.assign({}, params, { ownerId: ownerIdFirst, state: 1, contestId: this.contest.get('id') }),
    ];

    return Promise
      .mapSeries(
        pollsParams,
        poll => polls.service('polls').create(poll)
      )
      .spread((first, second, third, four, fifth) => {
        this.pollFirst = first;
        this.pollSecond = second;
        this.pollThird = third;
        this.pollFour = four;
        this.pollFifth = fifth;
      });
  });

  before('create answer', () => {
    const params = {
      title: 'Perchik',
      pollId: this.pollFirst.get('id'),
      position: 1,
    };

    return polls
      .service('answers')
      .create(params)
      .tap(answer => (this.answerFirst = answer));
  });

  before('create answer', () => {
    const params = {
      title: 'Dexter',
      pollId: this.pollFirst.get('id'),
      position: 2,
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

  it('should be able to ignore contest polls', () => {
    http()
      .then(({ body }) => {
        const first = find(body.data, { id: this.pollFirst.get('id') });
        const indexFifth = findIndex(body.data, { id: this.pollFifth.get('id') });

        assert.equal(first.id, this.pollFirst.get('id'));
        assert.equal(indexFifth, -1);
      })
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
        const { meta, data } = body;
        const { count, page, pageSize, pageCount, answers } = meta;
        const [poll] = data;
        const answer = poll.relations.answers.data[0];

        // meta
        assert.equal(count, 1);
        assert.equal(page, 3);
        assert.equal(pageSize, 1);
        assert.equal(pageCount, 3);

        answers.forEach((object) => {
          if (object.id === this.answerFirst.get('id')) {
            assert.equal(object.votesCount, 1);
            assert.equal(object.userAnswered, undefined);
          } else {
            assert.equal(object.votesCount, 0);
            assert.equal(object.userAnswered, undefined);
          }
        });

        // polls
        assert.equal(data.length, 1);
        assert.equal(poll.id, this.pollFirst.get('id'));

        // relations
        assert.equal(poll.relations.answers.data.length, 2);
        assert.equal(answer.id, this.answerFirst.get('id'));
        assert.equal(answer.type, 'pollAnswer');
        assert.equal(answer.attributes.title, 'Perchik');
        assert.equal(answer.attributes.pollId, this.pollFirst.get('id'));
        assert.equal(answer.attributes.position, 1);
        assert.ok(isISODate(answer.attributes.createdAt));
        assert.ok(isISODate(answer.attributes.updatedAt));
      });
  });

  it('should be able to get list meta for current user', () => {
    const qs = { filter: { ownerId: ownerIdFirst }, page: { size: 1, number: 3 } };

    return http({ qs, headers: authHeader(this.userToken) })
      .then(({ body }) => {
        const { meta } = body;
        const { answers } = meta;

        answers.forEach((object) => {
          if (object.id === this.answerFirst.get('id')) {
            assert.equal(object.votesCount, 1);
            assert.equal(object.userAnswered, true);
          } else {
            assert.equal(object.votesCount, 0);
            assert.equal(object.userAnswered, false);
          }
        });
      });
  });
});
