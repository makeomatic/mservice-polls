module.exports = {
  tableName: 'polls_users_answers',
  hasTimestamps: ['createdAt', 'updatedAt'],
  answer: function relationAnswer() {
    return this.belongsTo('Answer', 'answerId');
  },
};
