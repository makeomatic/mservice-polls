const model = {
  tableName: 'polls',
  hasTimestamps: ['createdAt', 'updatedAt'],
  answers: function relationAnswer() {
    return this.hasMany('Answer', 'pollId');
  },
  contest: function relationContest() {
    return this.belongsTo('Contest', 'contestId');
  },
};

const staticProps = {
  dependents: ['answers'],
};

module.exports = [
  model,
  staticProps,
];
