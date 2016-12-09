const { AuthenticationRequiredError } = require('common-errors');
const UserModel = require('../../../../models/user');

function getAuthToken(authHeader) {
  const [auth, token] = authHeader.trim().split(/\s+/, 2).map(str => str.trim());

  if (auth === undefined) {
    throw new AuthenticationRequiredError('Auth type must be present');
  }

  if (auth !== 'Bearer') {
    throw new AuthenticationRequiredError(`Invalid auth type ${auth}`);
  }

  if (token === undefined) {
    throw new AuthenticationRequiredError('Token must be present');
  }

  return token;
}

function tokenAuth({ headers }) {
  const { authorization } = headers;

  if (authorization) {
    const { amqp, config } = this;
    const { users: { audience, prefix, postfix, timeouts } } = config;
    const route = `${prefix}.${postfix.verify}`;
    const token = getAuthToken(authorization);
    const timeout = timeouts.verify;

    return amqp
      .publishAndWait(route, { token, audience }, { timeout })
      .then((response) => {
        const { username, metadata } = response;
        const user = new UserModel(username, metadata[audience]);

        return { user };
      });
  }

  return null;
}

module.exports = tokenAuth;
