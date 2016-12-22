const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.update Update the poll
 * @apiVersion 1.0.0
 * @apiName polls.update
 * @apiGroup Polls
 * @apiDescription Broadcast `pollUpdated` event with `Poll` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.update.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.update.response.json} apiSuccess
 */
function updatePollAction(request) {
  const { params, model: poll } = request;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_UPDATED } = serviceBroadcast.constructor.events;

  return poll
    .save(params)
    .then(modelResponse)
    .tap(updatedPoll =>
      serviceBroadcast.fire(POLL_UPDATED, updatedPoll, updatedPoll.data.attributes.ownerId)
    );
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;
  const { ENDED, ARCHIVED } = this.service('polls').constructor.state;

  if (poll.get('state') === ENDED || poll.get('state') === ARCHIVED) {
    throw new NotPermittedError('Can\'t modify poll that have ended');
  }

  return this.service('allowed').hasAccess(user, poll);
}

updatePollAction.allowed = allowed;
updatePollAction.auth = 'token';
updatePollAction.fetcher = fetcher;
updatePollAction.schema = 'polls.update.request';
updatePollAction.transports = ['http'];
updatePollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = updatePollAction;
