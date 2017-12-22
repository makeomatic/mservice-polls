module.exports = {
  tableName: 'contest_users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  contest: function relationContest() {
    return this.belongsTo('Contest', 'contestId');
  },
};
