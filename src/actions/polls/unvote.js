const { successResponse } = require('../../responses/success');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @TODO This is temporary action, refactor it if you need logic for unvote
 * @api {http.post} <prefix>.polls.unvote Remove votes
 * @apiVersion 1.0.0
 * @apiName polls.unvote
 * @apiGroup Polls
 * @apiSchema {jsonschema=../../../schemas/polls.unvote.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.unvote.response.json} apiSuccess
 */
function pollUnVoteAction(request) {
  const { auth, model: poll } = request;
  const serviceUsersAnswers = this.service('usersAnswers');
  const { user } = auth.credentials;
  const pollAnswersIds = poll.related('answers').map(answer => answer.get('id'));

  return serviceUsersAnswers
    .remove(pollAnswersIds, user.id)
    .then(successResponse);
}

function allowed(request) {
  const { model: poll } = request;
  const { STARTED } = this.service('polls').constructor.state;

  if (poll.get('state') !== STARTED) {
    throw new NotPermittedError('Voting is not started');
  }
}

pollUnVoteAction.allowed = allowed;
pollUnVoteAction.auth = 'token';
pollUnVoteAction.fetcher = fetcher;
pollUnVoteAction.schema = 'polls.unvote.request';
pollUnVoteAction.transports = ['http'];
pollUnVoteAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = pollUnVoteAction;
