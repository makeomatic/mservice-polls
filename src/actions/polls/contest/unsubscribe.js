const { successResponse } = require('../../../responses/success');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Contest');

/**
 * @api {http.post} <prefix>.polls.contest.unsubscribe Unsubscribe contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.unsubscribe
 * @apiGroup PollsContest
 * @apiSchema {jsonschema=../../../schemas/polls.contest.unsubscribe.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.contest.unsubscribe.response.json} apiSuccess
 */
function contestUnsubAction(request) {
  const { auth, model: contest } = request;

  const { user } = auth.credentials;
  const usersContestService = this.service('usersContest');

  return usersContestService
    .remove(contest.id, user.id)
    .then(successResponse);
}

function allowed(request) {
  const { model: contest } = request;
  const { STARTED } = this.service('contest').constructor.state;

  if (contest.get('state') !== STARTED) {
    throw new NotPermittedError('Contest is not started');
  }

  if (contest.get('hasQuestions')) {
    throw new NotPermittedError('Contest has questions and can\'t be subscribed/unsubscribe');
  }
}

contestUnsubAction.allowed = allowed;
contestUnsubAction.auth = 'token';
contestUnsubAction.fetcher = fetcher;
contestUnsubAction.schema = 'polls.contest.unsubscribe.request';
contestUnsubAction.transports = ['http'];
contestUnsubAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = contestUnsubAction;
