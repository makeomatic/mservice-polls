const { collectionResponse } = require('../../responses/polls');

/**
 * @api {http.get} <prefix>.polls.list Get list of polls
 * @apiVersion 1.0.0
 * @apiName polls.list
 * @apiGroup Polls
 * @apiSchema {jsonschema=../../../schemas/polls.list.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.list.response.json} apiSuccess
 */
function pollsListAction({ query }) {
  return this
    .service('polls')
    .list(query)
    .then(collectionResponse);
}

pollsListAction.schema = 'polls.list.request';
pollsListAction.transports = ['http'];
pollsListAction.transportsOptions = {
  http: {
    methods: ['get'],
  },
};

module.exports = pollsListAction;
