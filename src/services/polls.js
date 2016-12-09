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
}

Polls.state = {
  CREATED: 0,
  STARTED: 1,
  STOPED: 2,
  ENDED: 3,
  ARCHIVED: 4,
};

module.exports = Polls;
