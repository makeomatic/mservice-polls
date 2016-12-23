const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.end End the poll
 * @apiVersion 1.0.0
 * @apiName polls.end
 * @apiGroup Polls
 * @apiDescription Broadcast `pollEnded` event with `Poll` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.end.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.end.response.json} apiSuccess
 */
function endPollAction(request) {
  const { model: poll } = request;
  const { end } = this.service('polls').constructor;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_ENDED } = serviceBroadcast.constructor.events;

  return end(poll)
    .then(modelResponse)
    .tap(endedPoll =>
      serviceBroadcast.fire(POLL_ENDED, endedPoll, endedPoll.data.attributes.ownerId)
    );
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;

  return this.service('allowed').hasAccess(user, poll.get('ownerId'));
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
