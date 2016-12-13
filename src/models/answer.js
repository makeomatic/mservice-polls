const model = {
  tableName: 'polls_answers',
  hasTimestamps: ['createdAt', 'updatedAt'],
  poll: function relationPoll() {
    return this.belongsTo('Poll', 'pollId');
  },
  usersAnswers: function relationUsersAnswers() {
    return this.hasMany('UserAnswer', 'answerId');
  },
};

const staticProps = {
  dependents: ['usersAnswers'],
};

module.exports = [
  model,
  staticProps,
];
