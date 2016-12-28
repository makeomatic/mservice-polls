const { responseWithVotesCount } = require('../../../responses/answers');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const Promise = require('bluebird');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.get} <prefix>.polls.users.answers Get users answers of the poll
 * @apiVersion 1.0.0
 * @apiName polls.users.answers
 * @apiGroup PollsUsers
 * @apiHeader [Authorization] JWT authorization
 * @apiSchema {jsonschema=../../../../schemas/polls.users.answers.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.users.answers.response.json} apiSuccess
 */
function pollUsersAnswersAction(request) {
  const { auth: { credentials }, model: poll } = request;
  const serviceUsersAnswers = this.service('usersAnswers');
  const answers = poll.related('answers');
  const answersIds = answers.map(answer => answer.id);
  const userId = credentials ? credentials.user.id : null;

  return Promise
    .join(answers, serviceUsersAnswers.getVotes(answersIds, userId))
    .spread(responseWithVotesCount);
}

pollUsersAnswersAction.auth = 'token';
pollUsersAnswersAction.fetcher = fetcher;
pollUsersAnswersAction.schema = 'polls.users.answers.request';
pollUsersAnswersAction.transports = ['http'];
pollUsersAnswersAction.transportsOptions = {
  http: {
    methods: ['get'],
  },
};

module.exports = pollUsersAnswersAction;
