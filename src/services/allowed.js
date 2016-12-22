const { NotImplementedError, NotPermittedError } = require('common-errors');
const Promise = require('bluebird');

function fieldStrategy(options, user, ownerId) {
  const { field } = options;
  const value = user.data[field];

  if (value === undefined) {
    throw new NotPermittedError('Invalid user');
  }

  if (value !== ownerId) {
    throw new NotPermittedError('Hasn\'t access');
  }

  return Promise.resolve(true);
}

class Allowed {
  constructor(config) {
    this.config = config;
  }

  hasAccess(user, ownerId) {
    const { strategy, options } = this.config.userAccess;

    switch (strategy) {
      case 'field':
        return fieldStrategy(options, user, ownerId);
      default:
        throw new NotImplementedError(`Allowed strategy ${strategy}`);
    }
  }
}

module.exports = Allowed;
