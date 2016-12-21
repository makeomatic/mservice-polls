module.exports = {
  users: {
    prefix: 'users',
    postfix: {
      list: 'list',
      verify: 'verify',
      updateMetadata: 'updateMetadata',
    },
    timeouts: {
      list: 2000,
      verify: 2000,
      updateMetadata: 5000,
    },
    audience: '*.localhost',
  },
};
