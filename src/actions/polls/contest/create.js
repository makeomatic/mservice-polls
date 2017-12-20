const { modelResponse } = require('../../../responses/contest');

/**
 * @api {http.post} <prefix>.polls.contest.create Create a contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.create
 * @apiGroup PollsContest
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.contest.create.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.contest.create.response.json} apiSuccess
 */
function createContestAction({ params }) {
  const serviceBroadcast = this.service('broadcast');
  const { POLL_CONTEST_CREATED } = serviceBroadcast.constructor.events;

  return this
    .service('contest')
    .create(params)
    .then(modelResponse)
    .tap(contest => serviceBroadcast.fire(POLL_CONTEST_CREATED, contest,
      contest.data.attributes.ownerId));
}

function allowed({ auth, params }) {
  const { ownerId } = params;
  const { user } = auth.credentials;

  return this.service('allowed').hasAccess(user, ownerId);
}

createContestAction.allowed = allowed;
createContestAction.auth = 'token';
createContestAction.schema = 'polls.contest.create.request';
createContestAction.transports = ['http'];
createContestAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = createContestAction;
