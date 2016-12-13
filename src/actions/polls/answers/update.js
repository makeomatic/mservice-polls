const { modelResponse } = require('../../../responses/answers');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Answer', { relations: ['poll'] });

/**
 * @api {http.post} <prefix>.polls.answers.update Update the answer for the poll
 * @apiVersion 1.0.0
 * @apiName polls.answers.update
 * @apiGroup PollsAnswers
 * @apiDescription Broadcast `pollAnswerUpdated` event with `Answer` model
 * @apiSchema {jsonschema=../../../../schemas/polls.answers.update.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.answers.update.response.json} apiSuccess
 */
function updatePollAnswerAction(request) {
  const { params, model: answer } = request;
  const serviceBroadcast = this.service('broadcast');
  const { POLL_ANSWER_UPDATED } = serviceBroadcast.constructor.events;

  return answer
    .save(params)
    .then(modelResponse)
    .tap(updatedAnswer =>
      serviceBroadcast
        .fire(POLL_ANSWER_UPDATED, updatedAnswer, updatedAnswer.data.attributes.pollId)
    );
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

updatePollAnswerAction.allowed = allowed;
updatePollAnswerAction.auth = 'token';
updatePollAnswerAction.fetcher = fetcher;
updatePollAnswerAction.schema = 'polls.answers.update.request';
updatePollAnswerAction.transports = ['http'];
updatePollAnswerAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = updatePollAnswerAction;
