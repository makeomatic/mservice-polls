const { modelResponse } = require('../../../responses/contest');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const { NotPermittedError } = require('common-errors');
const set = require('lodash/set');

const fetcherContest = fetcherFactory('Contest', { relations: ['users', 'poll'] });
const fetcherAnswer = fetcherFactory('Answer', {
  key: { id: 'answerId' },
  require: false,
  setTo: 'answer',
  relations: ['usersAnswers'],
});

/**
 * @api {http.post} <prefix>.polls.contest.end End the contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.end
 * @apiGroup PollsContest
 * @apiDescription Broadcast `pollContestEnded` event with `Contest` model
 * @apiHeader Authorization JWT authorization
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.end.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.end.response.json} apiSuccess
 */
function endContestAction(request) {
  const { model: contest, answer } = request;
  const contestService = this.service('contest');
  const broadcastService = this.service('broadcast');
  const { end } = contestService.constructor;
  const { end: endPoll, state: { ENDED: POLL_ENDED } } = this.service('polls').constructor;
  const { POLL_CONTEST_ENDED } = broadcastService.constructor.events;

  return end(contest, answer)
    .then(modelResponse)
    .then((endedContest) => {
      // if has poll then chain the status
      if (endedContest.data.attributes.hasQuestions) {
        return endPoll(contest.relations.poll)
          // update poll state in the return object
          .then(() => set(endedContest, 'data.relations.poll.data.attributes.state', POLL_ENDED));
      }
      return endedContest;
    })
    .tap(endedContest =>
      broadcastService.fire(POLL_CONTEST_ENDED,
        endedContest, endedContest.data.attributes.ownerId)
    );
}

function allowed(request) {
  const { model: contest, answer, auth } = request;
  const { user } = auth.credentials;
  const { STOPPED } = this.service('contest').constructor.state;

  if (contest.get('state') !== STOPPED) {
    throw new NotPermittedError('Can\'t end a contest that is not stopped');
  }

  if (contest.get('hasQuestions') && !answer) {
    throw new NotPermittedError('Can\'t end a contest with questions without an answer');
  }

  return this.service('allowed').hasAccess(user, contest.get('ownerId'));
}

endContestAction.allowed = allowed;
endContestAction.auth = 'token';
endContestAction.fetchers = [fetcherContest, fetcherAnswer];
endContestAction.schema = 'polls.contest.end.request';
endContestAction.transports = ['http'];
endContestAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = endContestAction;
