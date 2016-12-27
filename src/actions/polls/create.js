const { modelResponse } = require('../../responses/polls');

/**
 * @api {http.post} <prefix>.polls.create Create a poll
 * @apiVersion 1.0.0
 * @apiName polls.create
 * @apiGroup Polls
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.create.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.create.response.json} apiSuccess
 */
function createPollAction({ params }) {
  const serviceBroadcast = this.service('broadcast');
  const { POLL_CREATED } = serviceBroadcast.constructor.events;

  return this
    .service('polls')
    .create(params)
    .then(modelResponse)
    .tap(poll => serviceBroadcast.fire(POLL_CREATED, poll, poll.data.attributes.ownerId));
}

function allowed({ auth, params }) {
  const { ownerId } = params;
  const { user } = auth.credentials;

  return this.service('allowed').hasAccess(user, ownerId);
}

createPollAction.allowed = allowed;
createPollAction.auth = 'token';
createPollAction.schema = 'polls.create.request';
createPollAction.transports = ['http'];
createPollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = createPollAction;
