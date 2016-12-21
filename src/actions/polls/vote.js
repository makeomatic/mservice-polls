const { responseWithVotesCount } = require('../../responses/answers');
const fetcherFactory = require('../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');
const Promise = require('bluebird');

const fetcher = fetcherFactory('Poll', { relations: ['answers'] });

/**
 * @api {http.post} <prefix>.polls.vote Vote for poll answers
 * @apiVersion 1.0.0
 * @apiName polls.vote
 * @apiGroup Polls
 * @apiDescription Broadcast `pollUserAnswer` event with collection of `Answer` with votes count
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
    .return(poll.related('answers').toArray())
    .map(answer => serviceUsersAnswers
      .getVotesCount(answer.get('id'))
      .then(votesCount => ({
        answer,
        votesCount,
        userAnswered: answersIds.includes(answer.get('id')),
      }))
    )
    .then(responseWithVotesCount)
    .tap(answersCollection =>
      serviceBroadcast.fire(POLL_USER_ANSWER, answersCollection, poll.get('ownerId'))
    );
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
    .getVotes(answersIds, user.id)
    .then((answers) => {
      if (answers.length !== 0) {
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
