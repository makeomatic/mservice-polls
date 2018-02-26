const { responseWithVotesCount } = require('../../responses/answers');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');
const omit = require('lodash/omit');
const set = require('lodash/set');
const Promise = require('bluebird');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });
const cleanAnswer = answer => omit(answer, 'userAnswered');

/**
 * @api {http.post} <prefix>.polls.vote Vote for poll answers
 * @apiVersion 1.0.0
 * @apiName polls.vote
 * @apiGroup Polls
 * @apiDescription Broadcast `pollUserAnswer` event with collection of `Answer` with votes count
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../schemas/polls.vote.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.vote.response.json} apiSuccess
 */
function pollVoteAction(request) {
  const { auth, params: { answersIds }, model: poll } = request;
  const serviceUsersAnswers = this.service('usersAnswers');
  const serviceBroadcast = this.service('broadcast');
  const { POLL_USER_ANSWER } = serviceBroadcast.constructor.events;
  const { user } = auth.credentials;

  return Promise
    .map(answersIds, answersId => serviceUsersAnswers.save(answersId, user.id))
    .then(() =>
      Promise.join(
        poll.related('answers'),
        serviceUsersAnswers
          .getVotes(poll.related('answers').map(answer => answer.get('id')), user.id)
      )
    )
    .spread(responseWithVotesCount)
    .then((response) => {
      set(response, 'meta.pollId', poll.id);
      return response;
    })
    .tap((response) => {
      const meta = Object.assign({}, response.meta);
      const answersCollection = Object.assign({}, response, { meta });

      // remove information about answer of the last user
      meta.answers = meta.answers.map(cleanAnswer);

      // broadcast stuff
      return serviceBroadcast.fire(POLL_USER_ANSWER, answersCollection, poll.get('ownerId'));
    });
}

/*
 * Checks:
 * 1. Poll state
 * 2. Poll min/max user answers count
 * 3. Answers belong to the poll
 * 4. Already answered
 */
function allowed(request) {
  const { model: poll, auth, params: { answersIds } } = request;
  const { user } = auth.credentials;
  const { STARTED } = this.service('polls').constructor.state;
  const pollAnswersIds = poll.related('answers').map(answer => answer.get('id'));

  if (poll.get('state') !== STARTED) {
    throw new NotPermittedError('Voting is not started');
  }

  if (answersIds.length < poll.get('minUserAnswersCount')) {
    throw new NotPermittedError('Need more answers');
  }

  if (answersIds.length > poll.get('maxUserAnswersCount')) {
    throw new NotPermittedError('Need less answers');
  }

  answersIds.forEach((answersId) => {
    if (pollAnswersIds.includes(answersId) === false) {
      throw new NotPermittedError(
        `Answer #${answersId} doesn't belong to poll #${poll.get('id')}`
      );
    }
  });

  return this
    .service('usersAnswers')
    .userVotes(answersIds, user.id)
    .then((answers) => {
      if (Object.keys(answers).length !== 0) {
        throw new NotPermittedError('Already answered');
      }
    });
}

pollVoteAction.allowed = allowed;
pollVoteAction.auth = 'token';
pollVoteAction.fetcher = fetcher;
pollVoteAction.schema = 'polls.vote.request';
pollVoteAction.transports = ['http'];
pollVoteAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = pollVoteAction;
