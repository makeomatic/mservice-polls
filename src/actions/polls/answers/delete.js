const { modelResponse } = require('../../../responses/answers');
const { successResponse } = require('../../../responses/success');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Answer', { relations: ['poll'] });

/**
 * @api {http.post} <prefix>.polls.answers.delete Delete the answer for the poll
 * @apiVersion 1.0.0
 * @apiName polls.answers.delete
 * @apiGroup PollsAnswers
 * @apiDescription Broadcast `pollAnswerDeleted` event with `Answer` model
 * @apiSchema {jsonschema=../../../../schemas/polls.answers.delete.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.answers.delete.response.json} apiSuccess
 */
function deletePollAnswerAction(request) {
  const { model: answer } = request;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_ANSWER_DELETED } = serviceBroadcast.constructor.events;

  return answer
    .destroy()
    .then(modelResponse)
    .tap(deletedAnswer =>
      serviceBroadcast
        .fire(POLL_ANSWER_DELETED, deletedAnswer, deletedAnswer.data.attributes.pollId)
    )
    .then(successResponse);
}

function allowed(request) {
  const { model: answer, auth } = request;
  const poll = answer.related('poll');
  const { user } = auth.credentials;
  const { ENDED, ARCHIVED } = this.service('polls').constructor.state;

  if (poll.get('state') === ENDED || poll.get('state') === ARCHIVED) {
    throw new NotPermittedError('Can\'t modify poll that have ended');
  }

  return this.service('allowed').hasAccess(user, poll);
}

deletePollAnswerAction.allowed = allowed;
deletePollAnswerAction.auth = 'token';
deletePollAnswerAction.fetcher = fetcher;
deletePollAnswerAction.schema = 'polls.answers.delete.request';
deletePollAnswerAction.transports = ['http'];
deletePollAnswerAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = deletePollAnswerAction;