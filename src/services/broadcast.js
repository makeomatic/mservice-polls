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

    return this.amqp.publish(route, { event, message, roomId }, { ttl });
  }
}

Broadcast.events = {
  POLL_CREATED: 'pollCreated',
  POLL_UPDATED: 'pollUpdated',
  POLL_DELETED: 'pollDeleted',
  POLL_STARTED: 'pollStarted',
  POLL_STOPPED: 'pollStoped',
  POLL_ENDED: 'pollEnded',
  POLL_ARCHIVED: 'pollArchived',
  POLL_ANSWER_CREATED: 'pollAnswerCreated',
  POLL_ANSWER_UPDATED: 'pollAnswerUpdated',
  POLL_ANSWER_DELETED: 'pollAnswerDeleted',
  POLL_USER_ANSWER: 'pollUserAnswer',
  POLL_CONTEST_CREATED: 'pollContestCreated',
  POLL_CONTEST_UPDATED: 'pollContestUpdated',
  POLL_CONTEST_DELETED: 'pollContestDeleted',
  POLL_CONTEST_STARTED: 'pollContestStarted',
  POLL_CONTEST_STOPPED: 'pollContestStoped',
  POLL_CONTEST_ENDED: 'pollContestEnded',
  POLL_CONTEST_ARCHIVED: 'pollContestArchived',
  POLL_CONTEST_USER_SUBSCRIBED: 'pollContestUserSubscribed',
  POLL_CONTEST_USER_UNSUBSCRIBED: 'pollContestUserUnsubscribed',
};

module.exports = Broadcast;
