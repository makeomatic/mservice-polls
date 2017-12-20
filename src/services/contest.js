const Chance = require('chance');

class Contest {
  constructor(bookshelf) {
    this.Contest = bookshelf.model('Contest');
  }

  create(params) {
    const attributes = Object.assign(
      { state: Contest.state.CREATED, startedAt: null, endedAt: null, meta: {} },
      params
    );
    const contest = new this.Contest(attributes);

    return contest.save();
  }

  list(query) {
    const { filter: { ownerId, state }, page, sort } = query;
    const builder = this.Contest.forge();

    if (ownerId) {
      builder.where({ ownerId });
    }

    if (state) {
      builder.where('state', 'IN', Array.isArray(state) ? state : [state]);
    }

    sort.forEach(field => builder.orderBy(field));

    return builder
      .fetchPage({
        pageSize: page.size,
        page: page.number,
        withRelated: ['users', 'poll.answers'],
      });
  }
}

Contest.start = (contest) => {
  const params = {
    state: Contest.state.STARTED,
  };

  if (contest.get('startedAt') === null) {
    params.startedAt = new Date();
  }

  return contest.save(params);
};

Contest.end = (contest, answer) => {
  let users;
  if (!contest.get('hasQuestions')) {
    users = contest.relations.users.models;
  } else {
    users = answer.related('usersAnswers').models;
  }

  let winners = [];
  if (users.length > 0) {
    const chance = new Chance();
    winners = chance
      .pickset(users, contest.get('nWinners'))
      .map(user => user.get('userId'));
  }

  const meta = Object.assign({}, contest.get('meta'), { winners });

  return contest.save({
    state: Contest.state.ENDED,
    meta,
    endedAt: new Date(),
  });
};

Contest.state = {
  CREATED: 0,
  STARTED: 1,
  STOPPED: 2,
  ENDED: 3,
  ARCHIVED: 4,
};

module.exports = Contest;
