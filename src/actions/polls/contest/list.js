const { collectionResponse } = require('../../../responses/contest');
const is = require('is');
const mapValues = require('lodash/mapValues');

/**
 * @api {http.get} <prefix>.polls.contest.list Get list of contests
 * @apiVersion 1.0.0
 * @apiName polls.contest.list
 * @apiGroup PollsContest
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.list.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.contest.list.response.json} apiSuccess
 */
function contestListAction(request) {
  const { query } = request;

  return this
    .service('contest')
    .list(query)
    .then(collectionResponse);
}

function transformQuery(query) {
  const transformed = {};

  if (query.page) {
    transformed.page = mapValues(query.page, prop => Number(prop));
  }

  if (query.filter && query.filter.state) {
    const state = Array.isArray(query.filter.state)
      ? query.filter.state.map(value => Number(value))
      : Number(query.filter.state);

    transformed.filter = Object.assign({}, query.filter, { state });
  }

  if (is.string(query.sort)) {
    transformed.sort = query.sort.split(',');
  }

  return Object.assign({}, query, transformed);
}

contestListAction.auth = 'token';
contestListAction.schema = 'polls.contest.list.request';
contestListAction.transformQuery = transformQuery;
contestListAction.transports = ['http'];
contestListAction.transportsOptions = {
  http: {
    methods: ['get'],
  },
};

module.exports = contestListAction;
