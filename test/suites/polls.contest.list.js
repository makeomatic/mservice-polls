const { auth: authHelper } = require('../helpers/auth');
const assert = require('assert');
const Chance = require('chance');
const config = require('../configs/service');
const Polls = require('../../src');
const Promise = require('bluebird');
const request = require('request-promise');

const chance = new Chance();
const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/contest/list',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'get',
});
const polls = new Polls(config);
const ownerIdFirst = chance.email();
const ownerIdSecond = chance.email();

describe('polls.contest.list', function suite() {
  before('start up service', () => polls.connect());

  before('create contestes', () => {
    const params = {
      prize: 'Toronto FC Jersey',
    };
    const contestsParams = [
      Object.assign({}, params, { ownerId: ownerIdFirst, state: 2 }),
      Object.assign({}, params, { ownerId: ownerIdSecond, state: 1 }),
      Object.assign({}, params, { ownerId: ownerIdFirst, state: 1 }),
      Object.assign({}, params, { ownerId: ownerIdFirst, state: 3 }),
    ];

    return Promise
      .mapSeries(
        contestsParams,
        contest => polls.service('contest').create(contest)
      )
      .spread((first, second, third, four) => {
        this.contestsFirst = first;
        this.contestSecond = second;
        this.contestThird = third;
        this.contestFour = four;
      });
  });

  before('create user subscription', () => polls
    .service('usersContest')
    .save(this.contestsFirst.get('id'), 'user@foo.com')
  );

  before('login user', () =>
    authHelper
      .call(polls, 'user@foo.com', 'userpassword000000')
      .tap(({ jwt }) => { this.userToken = jwt; })
  );

  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/contest/list',
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

  it('should be able to return list of contest', () =>
    http()
      .then(({ body }) => {
        assert.equal(body.data.length > 0, true);
      })
  );

  it('should be able to filter contest by owner id', () => {
    const qs = { filter: { ownerId: ownerIdSecond } };

    return http({ qs })
      .then(({ body }) => {
        assert.equal(body.data.length === 1, true);
      });
  });

  it('should be able to filter contests by state (one state)', () => {
    const qs = { filter: { ownerId: ownerIdFirst, state: 2 } };

    return http({ qs })
      .then(({ body }) => {
        assert.equal(body.data.length === 1, true);
        assert.equal(body.data[0].id, this.contestsFirst.get('id'));
      });
  });

  it('should be able to filter contests by state (many states)', () => {
    const uri = 'http://localhost:3000/api/polls/contest/list' +
      `?filter[ownerId]=${ownerIdFirst}&filter[state]=1&filter[state]=2`;

    return http({ uri })
      .then(({ body }) => {
        assert.equal(body.data.length === 2, true);
        assert.equal(body.data[0].id, this.contestThird.get('id'));
        assert.equal(body.data[1].id, this.contestsFirst.get('id'));
      });
  });

  it('should be able to sort contests', () => {
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
        assert.equal(body.data[0].id, this.contestsFirst.get('id'));
      });
  });

  it('should be able to paginate contests', () => {
    const qs = { filter: { ownerId: ownerIdFirst }, page: { size: 1, number: 3 } };

    return http({ qs })
      .then(({ body }) => {
        const { meta, data } = body;
        const { count, page, pageSize, pageCount } = meta;
        const [contest] = data;

        // meta
        assert.equal(count, 1);
        assert.equal(page, 3);
        assert.equal(pageSize, 1);
        assert.equal(pageCount, 3);

        // contests
        assert.equal(data.length, 1);
        assert.equal(contest.id, this.contestsFirst.get('id'));
      });
  });
});
