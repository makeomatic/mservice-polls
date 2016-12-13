class Polls {
  constructor(bookshelf) {
    this.Poll = bookshelf.model('Poll');
  }

  create(params) {
    const poll = new this.Poll(
      Object.assign({ state: Polls.state.CREATED, startedAt: null, endedAt: null }, params)
    );

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

Polls.state = {
  CREATED: 0,
  STARTED: 1,
  STOPED: 2,
  ENDED: 3,
  ARCHIVED: 4,
};

module.exports = Polls;
