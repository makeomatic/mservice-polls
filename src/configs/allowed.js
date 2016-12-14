module.exports = {
  allowed: {
    userAccess: {
      strategy: 'field',
      options: {
        field: 'ownerId',
      },
    },
    polls: {
      answers: {
        create: ['root'],
        update: ['root'],
        delete: ['root'],
      },
      create: ['root'],
      update: ['root'],
      delete: ['root'],
      start: ['root'],
      stop: ['root'],
      end: ['root'],
      archive: ['root'],
      vote: [],
    },
  },
};
