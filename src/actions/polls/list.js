const { collectionResponse } = require('../../responses/polls');
const flatten = require('lodash/flatten');
const is = require('is');
const mapValues = require('lodash/mapValues');
const Promise = require('bluebird');

/**
 * @api {http.get} <prefix>.polls.list Get list of polls
 * @apiVersion 1.0.0
 * @apiName polls.list
 * @apiGroup Polls
 * @apiSchema {jsonschema=../../../schemas/polls.list.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.list.response.json} apiSuccess
 */
function pollsListAction(request) {
  const { auth, query } = request;
  const userId = auth.credentials ? auth.credentials.user.id : null;

  return this
    .service('polls')
    .list(query)
    .then((polls) => {
      const answersIds = flatten(
        polls.map(poll => poll.related('answers').map(answer => answer.get('id')))
      );

      return Promise.join(polls, this.service('usersAnswers').getVotes(answersIds, userId));
    })
    .spread(collectionResponse);
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

pollsListAction.auth = 'token';
pollsListAction.schema = 'polls.list.request';
pollsListAction.transformQuery = transformQuery;
pollsListAction.transports = ['http'];
pollsListAction.transportsOptions = {
  http: {
    methods: ['get'],
  },
};

module.exports = pollsListAction;
