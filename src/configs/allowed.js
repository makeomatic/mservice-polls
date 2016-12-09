module.exports = {
  allowed: {
    userAccess: {
      strategy: 'field',
      options: {
        field: 'ownerId',
      },
    },
    polls: {
      create: ['root'],
      update: ['root'],
      delete: ['root'],
      start: ['root'],
    },
  },
};
