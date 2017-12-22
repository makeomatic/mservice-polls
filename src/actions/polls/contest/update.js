const { modelResponse } = require('../../../responses/contest');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Contest', { relations: ['users', 'poll.answers'] });

/**
 * @api {http.post} <prefix>.polls.contest.update Update the contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.update
 * @apiGroup PollsContest
 * @apiDescription Broadcast `pollContestUpdated` event with `Contest` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.update.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.update.response.json} apiSuccess
 */
function updateContestAction(request) {
  const { params, model: contest } = request;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_CONTEST_UPDATED } = serviceBroadcast.constructor.events;

  return contest
    .save(params)
    .then(modelResponse)
    .tap(updatedContest =>
      serviceBroadcast.fire(POLL_CONTEST_UPDATED, updatedContest,
        updatedContest.data.attributes.ownerId)
    );
}

function allowed(request) {
  const { model: contest, auth } = request;
  const { user } = auth.credentials;
  const { ENDED, ARCHIVED } = this.service('contest').constructor.state;

  if (contest.get('state') === ENDED || contest.get('state') === ARCHIVED) {
    throw new NotPermittedError('Can\'t modify contest that have ended');
  }

  return this.service('allowed').hasAccess(user, contest.get('ownerId'));
}

updateContestAction.allowed = allowed;
updateContestAction.auth = 'token';
updateContestAction.fetcher = fetcher;
updateContestAction.schema = 'polls.contest.update.request';
updateContestAction.transports = ['http'];
updateContestAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = updateContestAction;
