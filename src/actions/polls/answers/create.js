const { modelResponse } = require('../../../responses/answers');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');

const fetcher = fetcherFactory('Poll', { key: { id: 'pollId' } });

/**
 * @api {http.post} <prefix>.polls.answers.create Create the answer for the poll
 * @apiVersion 1.0.0
 * @apiName polls.answers.create
 * @apiGroup PollsAnswers
 * @apiDescription Broadcast `pollAnswerCreated` event with `Answer` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../../schemas/polls.answers.create.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.answers.create.response.json} apiSuccess
 */
function createPollAnswerAction({ params }) {
  const serviceBroadcast = this.service('broadcast');
  const { POLL_ANSWER_CREATED } = serviceBroadcast.constructor.events;

  return this
    .service('answers')
    .create(params)
    .then(modelResponse)
    .tap(answer =>
      serviceBroadcast.fire(POLL_ANSWER_CREATED, answer, answer.data.attributes.pollId)
    );
}

function allowed(request) {
  const { model: poll, auth } = request;
  const { user } = auth.credentials;
  const { ENDED, ARCHIVED } = this.service('polls').constructor.state;

  if (poll.get('state') === ENDED || poll.get('state') === ARCHIVED) {
    throw new NotPermittedError('Can\'t modify poll that have ended');
  }

  return this.service('allowed').hasAccess(user, poll);
}

createPollAnswerAction.allowed = allowed;
createPollAnswerAction.auth = 'token';
createPollAnswerAction.fetcher = fetcher;
createPollAnswerAction.schema = 'polls.answers.create.request';
createPollAnswerAction.transports = ['http'];
createPollAnswerAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = createPollAnswerAction;
