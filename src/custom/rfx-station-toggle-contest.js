const Promise = require('bluebird');

function getOwners(contest) {
  const { amqp, config } = this;
  const { users: { audience, prefix, postfix, timeouts } } = config;
  const route = `${prefix}.${postfix.list}`;
  const timeout = timeouts.list;
  const filter = {
    stationChatId: {
      eq: JSON.stringify(contest.get('ownerId')),
    },
    roles: {
      match: 'admin',
    },
  };

  return amqp.publishAndWait(route, { audience, filter }, { timeout });
}

function update(hasActiveContest = false, poll) {
  const { amqp, config } = this;
  const { users: { audience, prefix, postfix, timeouts } } = config;
  const route = `${prefix}.${postfix.updateMetadata}`;
  const timeout = timeouts.updateMetadata;
  const metadata = {
    $set: {
      hasActiveContest,
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

update.onStart = function onStart(contest) {
  return update.call(this, true, contest);
};

update.onStop = function onStop(contest) {
  return update.call(this, false, contest);
};

module.exports = update;
