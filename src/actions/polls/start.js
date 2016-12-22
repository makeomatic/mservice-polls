const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.start Start/resume the poll
 * @apiVersion 1.0.0
 * @apiName polls.start
 * @apiGroup Polls
 * @apiDescription Broadcast `pollStarted` event with `Poll` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.start.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.start.response.json} apiSuccess
 */
function startPollAction(request) {
  const { model: poll } = request;
  const { start } = this.service('polls').constructor;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_STARTED } = serviceBroadcast.constructor.events;

  return start(poll)
    .then(modelResponse)
    .tap(startedPoll =>
      serviceBroadcast.fire(POLL_STARTED, startedPoll, startedPoll.data.attributes.ownerId)
    )
    .tap(() => this.hook('polls:start:post', poll));
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;
  const { CREATED, STOPED } = this.service('polls').constructor.state;

  if (poll.get('state') !== CREATED && poll.get('state') !== STOPED) {
    throw new NotPermittedError('Can\'t start poll that have started or have ended');
  }

  return this.service('allowed').hasAccess(user, poll);
}

startPollAction.allowed = allowed;
startPollAction.auth = 'token';
startPollAction.fetcher = fetcher;
startPollAction.schema = 'polls.start.request';
startPollAction.transports = ['http'];
startPollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = startPollAction;
