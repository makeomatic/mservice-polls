const { modelResponse } = require('../../responses/polls');
const fetcherFactory = require('../../plugins/fetcher/factory');

const fetcher = fetcherFactory('Poll');

/**
 * @api {http.get} <prefix>.polls.get Get the poll
 * @apiVersion 1.0.0
 * @apiName polls.get
 * @apiGroup Polls
 * @apiSchema {jsonschema=../../../schemas/polls.get.request.json} apiParam
 * @apiSchema {jsonschema=../../../schemas/polls.get.response.json} apiSuccess
 */
function getPollAction(request) {
  const { model: poll } = request;

  return modelResponse(poll);
}

getPollAction.fetcher = fetcher;
getPollAction.schema = 'polls.get.request';
getPollAction.transports = ['http'];
getPollAction.transportsOptions = {
  http: {
    methods: ['get'],
  },
};

module.exports = getPollAction;
