const model = {
  tableName: 'polls',
  hasTimestamps: ['createdAt', 'updatedAt'],
  answers: function relationAnswer() {
    return this.hasMany('Answer', 'pollId');
  },
};

const staticProps = {
  dependents: ['answers'],
};

module.exports = [
  model,
  staticProps,
];
