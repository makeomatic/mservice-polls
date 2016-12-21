class UsersAnswers {
  constructor(bookshelf) {
    this.UserAnswer = bookshelf.model('UserAnswer');
  }

  getVotes(answersIds, userId) {
    return this.UserAnswer
      .forge()
      .where('userId', userId)
      .where('answerId', 'IN', answersIds)
      .fetchAll();
  }

  getVotesCount(answerId) {
    return this.UserAnswer
      .forge()
      .where('answerId', answerId)
      .count();
  }

  save(answerId, userId) {
    const answer = new this.UserAnswer({
      answerId,
      userId,
    });

    return answer.save();
  }

  remove(answersIds, userId) {
    return this.UserAnswer
      .forge()
      .where('answerId', 'IN', answersIds)
      .where('userId', userId)
      .destroy();
  }
}

module.exports = UsersAnswers;
