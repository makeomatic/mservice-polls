const Promise = require('bluebird');

const indexedReducer = (indexed, data) => {
  // eslint-disable-next-line no-param-reassign
  indexed[data.answerId] = data;
  return indexed;
};

class UsersAnswers {
  constructor(bookshelf) {
    this.UserAnswer = bookshelf.model('UserAnswer');
  }

  getVotes(answersIds, userId) {
    const votesCount = this.UserAnswer
      .query()
      .select('answerId')
      .count('id')
      .groupBy('answerId')
      .where('answerId', 'IN', answersIds)
      .reduce(indexedReducer, {});

    const promises = [votesCount];

    if (userId) {
      promises.push(this.userVotes(answersIds, userId));
    }

    return Promise
      .join(...promises)
      .spread((votes, userAnswers) => answersIds.map((id) => {
        const response = {
          id,
          votesCount: votes[id] ? Number(votes[id].count) : 0,
        };

        if (userAnswers) {
          response.userAnswered = userAnswers[id] !== undefined;
        }

        return response;
      }));
  }

  userVotes(answersIds, userId) {
    return this.UserAnswer
      .query()
      .select('answerId')
      .where('answerId', 'IN', answersIds)
      .where('userId', userId)
      .reduce(indexedReducer, {});
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
