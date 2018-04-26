const assert = require('assert');
const Polls = require('../../src');
const config = require('../configs/service');
const { auth: authHelper, authHeader } = require('../helpers/auth');
const Promise = require('bluebird');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/users/list',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'get',
});
const polls = new Polls(config);

describe('polls.users.list', function suite() {
  before('start up service', () => polls.connect());

  before('login admin', () =>
    authHelper
      .call(polls, 'root@foo.com', 'rootpassword000000')
      .tap(({ jwt }) => { this.rootToken = jwt; })
  );

  before('create poll', () => polls
    .service('polls')
    .create({
      title: 'What is your favorite car?',
      minUserAnswersCount: 1,
      maxUserAnswersCount: 1,
      state: 1,
      ownerId: 'owner@poll.com',
    })
    .tap((poll) => { this.poll = poll; })
  );

  before('create answers', () => {
    const answers = [
      { title: 'Porsche', pollId: this.poll.get('id'), position: 1 },
      { title: 'Lexus', pollId: this.poll.get('id'), position: 2 },
    ];
    return Promise.map(
      answers,
      answer => polls.service('answers').create(answer)
    ).spread((first, second) => {
      this.firstAnswer = first;
      this.secondAnswer = second;
    });
  });

  before('create user answers', () => {
    const usersAnswers = [
      { answerId: this.firstAnswer.get('id'), userId: 'user@foo.com' },
      { answerId: this.firstAnswer.get('id'), userId: 'seconduser@foo.com' },
    ];
    return Promise.map(
      usersAnswers,
      ({ answerId, userId }) =>
        polls
          .service('usersAnswers')
          .save(answerId, userId));
  });

  after('shutdown service', () => polls.close());

  it('should be able to list by answer id', () => {
    const headers = authHeader(this.rootToken);
    const qs = { id: this.firstAnswer.get('id') };
    return http({ qs, headers })
      .then(({ body }) => {
        assert.equal(body.data.length === 2, true);
      });
  });

  it('should be able to sort', () => {
    const headers = authHeader(this.rootToken);
    const qs = {
      id: this.firstAnswer.get('id'),
      page: { size: 1 },
      sort: 'userId',
    };
    return http({ qs, headers })
      .then(({ body }) => {
        assert.equal(body.data.length === 1, true);
        assert.equal(body.data[0].id, 'seconduser@foo.com');
      });
  });

  it('should be able to paginate', () => {
    const headers = authHeader(this.rootToken);
    const qs = {
      id: this.firstAnswer.get('id'),
      page: { size: 1, number: 2 },
      sort: '-userId',
    };
    return http({ qs, headers })
      .then(({ body }) => {
        const { meta, data } = body;
        const { count, page, pageSize, pageCount } = meta;

        // meta
        assert.equal(count, 1);
        assert.equal(page, 2);
        assert.equal(pageSize, 1);
        assert.equal(pageCount, 2);

        assert.equal(data.length === 1, true);
        assert.equal(data[0].id, 'seconduser@foo.com');
      });
  });
});
