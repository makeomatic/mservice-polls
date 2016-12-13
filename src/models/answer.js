module.exports = {
  tableName: 'polls_answers',
  hasTimestamps: ['createdAt', 'updatedAt'],
  poll: function relationPoll() {
    return this.belongsTo('Poll', 'pollId');
  },
};
