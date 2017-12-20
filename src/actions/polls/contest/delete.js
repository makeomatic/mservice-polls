const { successResponse } = require('../../../responses/success');
const { modelResponse } = require('../../../responses/contest');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Contest', { relations: ['users', 'poll'] });

/**
 * @api {http.post} <prefix>.polls.contest.delete Delete the contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.delete
 * @apiGroup PollsContest
 * @apiDescription Broadcast `pollContestDeleted` event with `Contest` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.contest.delete.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.contest.delete.response.json} apiSuccess
 */
function deleteContestAction(request) {
  const { model: contest } = request;
  const deletedContest = modelResponse(contest);
  const serviceBroadcast = this.service('broadcast');
  const { POLL_CONTEST_DELETED } = serviceBroadcast.constructor.events;

  return contest
    .destroy()
    .tap(() =>
      serviceBroadcast.fire(POLL_CONTEST_DELETED, deletedContest, deletedContest.data.attributes.ownerId)
    )
    .then(successResponse);
}

function allowed(request) {
  const { model: contest, auth } = request;
  const { user } = auth.credentials;
  const { STARTED } = this.service('contest').constructor.state;

  if (contest.get('state') === STARTED) {
    throw new NotPermittedError('Can\'t delete contest that have started');
  }

  return this.service('allowed').hasAccess(user, contest.get('ownerId'));
}

deleteContestAction.allowed = allowed;
deleteContestAction.auth = 'token';
deleteContestAction.fetcher = fetcher;
deleteContestAction.schema = 'polls.contest.delete.request';
deleteContestAction.transports = ['http'];
deleteContestAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = deleteContestAction;
