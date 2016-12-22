const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

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
  const { STOPED } = this.service('polls').constructor.state;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_STOPED } = serviceBroadcast.constructor.events;

  return poll
    .save({ state: STOPED })
    .then(modelResponse)
    .tap(stopedPoll =>
      serviceBroadcast.fire(POLL_STOPED, stopedPoll, stopedPoll.data.attributes.ownerId)
    )
    .tap(() => this.hook('polls:stop:post', poll));
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;
  const { STARTED } = this.service('polls').constructor.state;

  if (poll.get('state') !== STARTED) {
    throw new NotPermittedError('Can\'t stop poll that have not started');
  }

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
