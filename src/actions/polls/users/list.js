const { collectionResponse } = require('../../../responses/users');
const fetcherFactory = require('../../../plugins/fetcher/factory');
const mapValues = require('lodash/mapValues');
const is = require('is');

const fetcher = fetcherFactory('Answer', { relations: ['poll'] });

/**
 * @api {http.get} <prefix>.polls.users.list Get list of users for an answer
 * @apiVersion 1.0.0
 * @apiName polls.users.list
 * @apiGroup PollsUsers
 * @apiHeader [Authorization] JWT authorization
 * @apiSchema {jsonschema=../../../../schemas/polls.users.list.request.json} apiParam
 * @apiSchema {jsonschema=../../../../schemas/polls.users.list.response.json} apiSuccess
 */
function pollUsersListAction(request) {
  const { query } = request;
  const service = this.service('usersAnswers');
  return service
    .listUsers(query)
    .then(collectionResponse);
}

function allowed(request) {
  const { model: answer, auth } = request;
  const { user } = auth.credentials;
  const poll = answer.related('poll');

  return this.service('allowed').hasAccess(user, poll.get('ownerId'));
}

function transformQuery(query) {
  const transformed = {};

  if (query.page) {
    transformed.page = mapValues(query.page, prop => Number(prop));
  }

  if (is.string(query.sort)) {
    transformed.sort = query.sort.split(',');
  }

  return Object.assign({}, query, transformed);
}

pollUsersListAction.allowed = allowed;
pollUsersListAction.fetcher = fetcher;
pollUsersListAction.transformQuery = transformQuery;
pollUsersListAction.auth = 'token';
pollUsersListAction.schema = 'polls.users.list.request';
pollUsersListAction.transports = ['http'];
pollUsersListAction.transportsOptions = {
  http: {
    methods: ['get'],
  },
};

module.exports = pollUsersListAction;
