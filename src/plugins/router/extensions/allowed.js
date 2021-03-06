const get = require('lodash/get');
const is = require('is');
const { NotPermittedError } = require('common-errors');

function postAuth(error, request) {
  const result = Promise.resolve([error, request]);

  if (error) {
    return result;
  }

  const { route } = request;
  const { allowed } = this.config;
  const roles = get(allowed, route, null);

  if (roles === null) {
    return result;
  }

  if (is.object(request.auth.credentials) === false) {
    throw new NotPermittedError('Auth required');
  }

  const { user } = request.auth.credentials;

  if (user === undefined) {
    throw new NotPermittedError('Invalid credentials');
  }

  if (user.hasOneOfRoles(roles) === false) {
    throw new NotPermittedError('Invalid roles');
  }

  return result;
}

module.exports = [
  {
    point: 'postAuth',
    handler: postAuth,
  },
];
