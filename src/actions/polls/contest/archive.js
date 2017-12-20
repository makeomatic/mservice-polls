const { modelResponse } = require('../../../responses/contest');
const fetcherFactory = require('../../../plugins/fetcher/factory');

const fetcher = fetcherFactory('Contest');

/**
 * @api {http.post} <prefix>.polls.contest.archive Archive the contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.archive
 * @apiGroup PollsContest
 * @apiDescription Broadcast `pollContestArchived` event with `Contest` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.contest.archive.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.contest.archive.response.json} apiSuccess
 */
function archiveContestAction(request) {
  const { model: contest } = request;
  const { ARCHIVED } = this.service('contest').constructor.state;
  const broadcastService = this.service('broadcast');
  const { POLL_CONTEST_ARCHIVED } = broadcastService.constructor.events;

  return contest
    .save({ state: ARCHIVED })
    .then(modelResponse)
    .tap(archivedContest =>
      broadcastService.fire(POLL_CONTEST_ARCHIVED, archivedContest, archivedContest.data.attributes.ownerId)
    );
}

function allowed(request) {
  const { model: contest, auth } = request;
  const { user } = auth.credentials;

  return this.service('allowed').hasAccess(user, contest.get('ownerId'));
}

archiveContestAction.allowed = allowed;
archiveContestAction.auth = 'token';
archiveContestAction.fetcher = fetcher;
archiveContestAction.schema = 'polls.contest.archive.request';
archiveContestAction.transports = ['http'];
archiveContestAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = archiveContestAction;
