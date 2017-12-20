class Polls {
  constructor(bookshelf) {
    this.Poll = bookshelf.model('Poll');
  }

  create(params) {
    const attributes = Object.assign(
      { state: Polls.state.CREATED, startedAt: null, endedAt: null, meta: {} },
      params
    );
    const poll = new this.Poll(attributes);

    return poll.save();
  }

  list(query) {
    const { filter: { ownerId, state }, page, sort } = query;
    const builder = this.Poll.forge();

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
        withRelated: ['answers'],
      });
  }
}

Polls.start = (poll) => {
  const params = {
    state: Polls.state.STARTED,
  };

  if (poll.get('startedAt') === null) {
    params.startedAt = new Date();
  }

  return poll.save(params);
};

Polls.end = (poll) => {
  const params = {
    state: Polls.state.ENDED,
    endedAt: new Date(),
  };

  return poll.save(params);
};

Polls.state = {
  CREATED: 0,
  STARTED: 1,
  STOPPED: 2,
  ENDED: 3,
  ARCHIVED: 4,
};

module.exports = Polls;
