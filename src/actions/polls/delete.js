const { successResponse } = require('../../responses/success');
const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.delete Delete the poll
 * @apiVersion 1.0.0
 * @apiName polls.delete
 * @apiGroup Polls
 * @apiDescription Broadcast `pollDeleted` event with `Poll` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.delete.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.delete.response.json} apiSuccess
 */
function deletePollAction(request) {
  const { model: poll } = request;
  const deletedPoll = modelResponse(poll);
  const serviceBroadcast = this.service('broadcast');
  const { POLL_DELETED } = serviceBroadcast.constructor.events;

  return poll
    .destroy()
    .tap(() =>
      serviceBroadcast.fire(POLL_DELETED, deletedPoll, deletedPoll.data.attributes.ownerId)
    )
    .then(successResponse);
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;
  const { STARTED } = this.service('polls').constructor.state;

  if (poll.get('state') === STARTED) {
    throw new NotPermittedError('Can\'t delete poll that have started');
  }

  return this.service('allowed').hasAccess(user, poll.get('ownerId'));
}

deletePollAction.allowed = allowed;
deletePollAction.auth = 'token';
deletePollAction.fetcher = fetcher;
deletePollAction.schema = 'polls.delete.request';
deletePollAction.transports = ['http'];
deletePollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = deletePollAction;
