const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.end End the poll
 * @apiVersion 1.0.0
 * @apiName polls.end
 * @apiGroup Polls
 * @apiDescription Broadcast `pollEnded` event with `Poll` model
 * @apiSchema {jsonschema=../../../schemas/polls.end.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.end.response.json} apiSuccess
 */
function endPollAction(request) {
  const { model: poll } = request;
  const { ENDED } = this.service('polls').constructor.state;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_ENDED } = serviceBroadcast.constructor.events;

  return poll
    .save({ state: ENDED })
    .then(modelResponse)
    .tap(endedPoll =>
      serviceBroadcast.fire(POLL_ENDED, endedPoll, endedPoll.data.attributes.ownerId)
    );
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;
  const { STOPED } = this.service('polls').constructor.state;

  if (poll.get('state') !== STOPED) {
    throw new NotPermittedError('Can\'t end poll that have not stoped');
  }

  return this.service('allowed').hasAccess(user, poll);
}

endPollAction.allowed = allowed;
endPollAction.auth = 'token';
endPollAction.fetcher = fetcher;
endPollAction.schema = 'polls.end.request';
endPollAction.transports = ['http'];
endPollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = endPollAction;
