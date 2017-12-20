const model = {
  tableName: 'contest',
  hasTimestamps: ['createdAt', 'updatedAt'],
  poll: function relationPoll() {
    return this.hasOne('Poll', 'contestId');
  },
  users: function relationUsers() {
    return this.hasMany('UserContest', 'contestId');
  },
};

const staticProps = {
  dependents: ['users', 'poll'],
};

module.exports = [
  model,
  staticProps,
];
