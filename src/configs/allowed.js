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
      contest: {
        create: ['root'],
        update: ['root'],
        delete: ['root'],
        start: ['root'],
        stop: ['root'],
        archive: ['root'],
        end: ['root'],
        subscribe: [],
        unsubscribe: [],
      },
      users: {
        list: ['root'],
      },
      create: ['root'],
      update: ['root'],
      delete: ['root'],
      start: ['root'],
      stop: ['root'],
      end: ['root'],
      archive: ['root'],
      vote: [],
      unvote: [],
    },
  },
};
