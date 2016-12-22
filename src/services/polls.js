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
    const { filter, page, sort } = query;

    return this.Poll
      .forge()
      .where(filter)
      .orderBy(sort)
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
  STOPED: 2,
  ENDED: 3,
  ARCHIVED: 4,
};

module.exports = Polls;
