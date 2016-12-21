const Promise = require('bluebird');

function getOwners(poll) {
  const { amqp, config } = this;
  const { users: { audience, prefix, postfix, timeouts } } = config;
  const route = `${prefix}.${postfix.list}`;
  const timeout = timeouts.list;
  const filter = {
    stationChatId: {
      eq: JSON.stringify(poll.get('ownerId')),
    },
    roles: {
      match: 'admin',
    },
  };

  return amqp.publishAndWait(route, { audience, filter }, { timeout });
}

function update(hasActivePoll = false, poll) {
  const { amqp, config } = this;
  const { users: { audience, prefix, postfix, timeouts } } = config;
  const route = `${prefix}.${postfix.updateMetadata}`;
  const timeout = timeouts.updateMetadata;
  const metadata = {
    $set: {
      hasActivePoll,
    },
  };

  return Promise
    .bind(this, poll)
    .then(getOwners)
    .get('users')
    .map(user =>
      amqp.publishAndWait(route, {
        audience,
        username: user.id,
        metadata,
      }, { timeout })
    );
}

update.onStart = function onStart(poll) {
  return update.call(this, true, poll);
};

update.onStop = function onStop(poll) {
  return update.call(this, false, poll);
};

module.exports = update;
