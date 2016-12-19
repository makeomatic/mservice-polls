module.exports = {
  users: {
    prefix: 'users',
    postfix: {
      verify: 'verify',
      updateMetadata: 'updateMetadata',
    },
    timeouts: {
      verify: 2000,
      updateMetadata: 5000,
    },
    audience: '*.localhost',
  },
};
