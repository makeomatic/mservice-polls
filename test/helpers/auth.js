function auth(username, password) {
  return this.amqp.publishAndWait('users.login', {
    password,
    username,
    audience: '*.localhost',
  });
}

function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

module.exports = {
  auth,
  authHeader,
};
