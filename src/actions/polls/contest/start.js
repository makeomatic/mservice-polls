const { modelResponse } = require('../../../responses/contest');
const fetcherFactory = require('../../../plugins/fetcher/factory');

const fetcher = fetcherFactory('Contest');

/**
 * @api {http.post} <prefix>.polls.contest.start Start/resume the contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.start
 * @apiGroup PollsContest
 * @apiDescription Broadcast `pollContestStarted` event with `Contest` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.start.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.start.response.json} apiSuccess
 */
function startContestAction(request) {
  const { model: contest } = request;
  const { start } = this.service('contest').constructor;
  const broadcastService = this.service('broadcast');
  const { POLL_CONTEST_STARTED } = broadcastService.constructor.events;

  return start(contest)
    .then(modelResponse)
    .tap(startedContest =>
      broadcastService.fire(POLL_CONTEST_STARTED, startedContest,
        startedContest.data.attributes.ownerId)
    )
    .tap(() => this.hook('polls:contest:start:post', contest));
}

function allowed(request) {
  const { model: contest, auth } = request;
  const { user } = auth.credentials;

  return this.service('allowed').hasAccess(user, contest.get('ownerId'));
}

startContestAction.allowed = allowed;
startContestAction.auth = 'token';
startContestAction.fetcher = fetcher;
startContestAction.schema = 'polls.contest.start.request';
startContestAction.transports = ['http'];
startContestAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = startContestAction;
