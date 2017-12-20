const { responseWithSubCount } = require('../../../responses/contest');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');
const Promise = require('bluebird');

const fetcher = fetcherFactory('Contest', { relations: ['users'] });

/**
 * @api {http.post} <prefix>.polls.contest.subscribe Subscribe to contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.subscribe
 * @apiGroup PollsContest
 * @apiSchema {jsonschema=../../../schemas/polls.contest.subscribe.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.contest.subscribe.response.json} apiSuccess
 */
function contestSubAction(request) {
  const { auth, model: contest } = request;

  const { user } = auth.credentials;
  const usersContestService = this.service('usersContest');
  const broadcastService = this.service('broadcast');
  const { POLL_CONTEST_USER_SUBSCRIBED } = broadcastService.constructor.events;

  return usersContestService
    .save(contest.id, user.id)
    .then(() =>
      Promise.join(
        contest,
        usersContestService.getSubCount(contest.id)
      )
    )
    .spread(responseWithSubCount)
    .tap(response =>
      broadcastService
        .fire(POLL_CONTEST_USER_SUBSCRIBED, response, contest.get('ownerId'))
    );
}

function allowed(request) {
  const { auth, model: contest } = request;
  const { user } = auth.credentials;
  const { STARTED } = this.service('contest').constructor.state;

  if (contest.get('state') !== STARTED) {
    throw new NotPermittedError('Contest is not started');
  }

  if (contest.get('hasQuestions')) {
    throw new NotPermittedError('Contest has questions and can\'t be subscribed');
  }

  return this.service('usersContest')
    .hasUserSubscribed(contest.id, user.id)
    .then((hasSubscribed) => {
      if (hasSubscribed) {
        throw new NotPermittedError('Already subscribed');
      }
    });
}

contestSubAction.allowed = allowed;
contestSubAction.auth = 'token';
contestSubAction.fetcher = fetcher;
contestSubAction.schema = 'polls.contest.subscribe.request';
contestSubAction.transports = ['http'];
contestSubAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = contestSubAction;
