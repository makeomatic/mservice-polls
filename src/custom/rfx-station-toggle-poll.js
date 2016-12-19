function update(hasActivePoll = false, poll) {
  const { amqp, config } = this;
  const { users: { audience, prefix, postfix, timeouts } } = config;
  const route = `${prefix}.${postfix.updateMetadata}`;
  const timeout = timeouts.verify;
  const username = poll.get('ownerId');
  const metadata = {
    hasActivePoll,
  };

  return amqp.publishAndWait(route, { audience, username, metadata }, { timeout });
}

update.onStart = function onStart(poll) {
  return update.call(this, true, poll);
};

update.onStop = function onStop(poll) {
  return update.call(this, false, poll);
};

module.exports = update;
