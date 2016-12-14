const Promise = require('bluebird');

class Broadcast {
  constructor(config, amqp) {
    this.amqp = amqp;
    this.config = config;
  }

  fire(event, message, roomId = null) {
    if (this.config.enabled === false) {
      return Promise.resolve(message);
    }

    const { route, ttl } = this.config;

    return this.amqp.publish(route, { message, roomId }, { ttl });
  }
}

Broadcast.events = {
  POLL_UPDATED: 'pollUpdated',
  POLL_DELETED: 'pollDeleted',
  POLL_STARTED: 'pollStarted',
  POLL_STOPED: 'pollStoped',
  POLL_ENDED: 'pollEnded',
  POLL_ARCHIVED: 'pollArchived',
  POLL_ANSWER_CREATED: 'pollAnswerCreated',
  POLL_ANSWER_UPDATED: 'pollAnswerUpdated',
  POLL_ANSWER_DELETED: 'pollAnswerDeleted',
  POLL_USER_ANSWER: 'pollUserAnswer',
};

module.exports = Broadcast;
