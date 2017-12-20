const { modelResponse } = require('../../../responses/contest');
const fetcherFactory = require('../../../plugins/fetcher/factory');

const fetcher = fetcherFactory('Contest', { relations: ['users', 'poll.answers'] });

/**
 * @api {http.get} <prefix>.polls.contest.get Get the contest
 * @apiVersion 1.0.0
 * @apiName polls.contest.get
 * @apiGroup PollsContest
 * @apiSchema {jsonschema=../../../schemas/polls.contest.get.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.contest.get.response.json} apiSuccess
 */
function getContestAction(request) {
  const { model: contest } = request;

  return modelResponse(contest);
}

getContestAction.fetcher = fetcher;
getContestAction.schema = 'polls.contest.get.request';
getContestAction.transports = ['http'];
getContestAction.transportsOptions = {
  http: {
    methods: ['get'],
  },
};

module.exports = getContestAction;
