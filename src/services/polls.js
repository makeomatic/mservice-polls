class Polls {
  constructor(bookshelf) {
    this.Poll = bookshelf.model('Poll');
  }

  create(params) {
    const poll = new this.Poll(
      Object.assign({ state: Polls.state.created, startedAt: null, endedAt: null }, params)
    );

    return poll.save();
  }
}

Polls.state = {
  created: 0,
  started: 1,
  stoped: 2,
  ended: 3,
  archived: 4,
};

module.exports = Polls;
