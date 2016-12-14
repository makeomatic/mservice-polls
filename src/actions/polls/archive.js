const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.archive Archive the poll
 * @apiVersion 1.0.0
 * @apiName polls.archive
 * @apiGroup Polls
 * @apiDescription Broadcast `pollArchived` event with `Poll` model
 * @apiSchema {jsonschema=../../../schemas/polls.archive.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.archive.response.json} apiSuccess
 */
function archivePollAction(request) {
  const { model: poll } = request;
  const { ARCHIVED } = this.service('polls').constructor.state;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_ARCHIVED } = serviceBroadcast.constructor.events;

  return poll
    .save({ state: ARCHIVED })
    .then(modelResponse)
    .tap(archivedPoll =>
      serviceBroadcast.fire(POLL_ARCHIVED, archivedPoll, archivedPoll.data.attributes.ownerId)
    );
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;
  const { ENDED } = this.service('polls').constructor.state;

  if (poll.get('state') !== ENDED) {
    throw new NotPermittedError('Can\'t archive poll that have not ended');
  }

  return this.service('allowed').hasAccess(user, poll);
}

archivePollAction.allowed = allowed;
archivePollAction.auth = 'token';
archivePollAction.fetcher = fetcher;
archivePollAction.schema = 'polls.archive.request';
archivePollAction.transports = ['http'];
archivePollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = archivePollAction;
