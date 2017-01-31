const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.stop Stop the poll
 * @apiVersion 1.0.0
 * @apiName polls.stop
 * @apiGroup Polls
 * @apiDescription Broadcast `pollStoped` event with `Poll` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.stop.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.stop.response.json} apiSuccess
 */
function stopPollAction(request) {
  const { model: poll } = request;
  const { STOPPED } = this.service('polls').constructor.state;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_STOPPED } = serviceBroadcast.constructor.events;

  return poll
    .save({ state: STOPPED })
    .then(modelResponse)
    .tap(stoppedPoll =>
      serviceBroadcast.fire(POLL_STOPPED, stoppedPoll, stoppedPoll.data.attributes.ownerId)
    )
    .tap(() => this.hook('polls:stop:post', poll));
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;

  return this.service('allowed').hasAccess(user, poll.get('ownerId'));
}

stopPollAction.allowed = allowed;
stopPollAction.auth = 'token';
stopPollAction.fetcher = fetcher;
stopPollAction.schema = 'polls.stop.request';
stopPollAction.transports = ['http'];
stopPollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = stopPollAction;
