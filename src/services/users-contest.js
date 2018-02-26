class UsersContest {
  constructor(bookshelf) {
    this.UserContest = bookshelf.model('UserContest');
  }

  getSubCount(contestId) {
    return this.UserContest
      .query()
      .select('contestId')
      .count('id as subCount')
      .groupBy('contestId')
      .where('contestId', contestId)
      .first()
      .then(({ subCount }) => ({
        contestId,
        subCount: Number(subCount),
      }));
  }

  hasUserSubscribed(contestId, userId) {
    return this.UserContest
      .query()
      .count('id as subCount')
      .where('contestId', contestId)
      .where('userId', userId)
      .first()
      .then(({ subCount }) => Number(subCount) !== 0);
  }

  save(contestId, userId) {
    const sub = new this.UserContest({
      contestId,
      userId,
    });

    return sub.save();
  }

  remove(contestId, userId) {
    return this.UserContest
      .forge()
      .where('contestId', contestId)
      .where('userId', userId)
      .destroy();
  }
}

module.exports = UsersContest;
