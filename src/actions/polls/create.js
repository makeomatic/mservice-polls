/**
 * @api {http} <prefix>.polls Create a poll
 * @apiVersion 1.0.0
 * @apiName polls.create
 * @apiGroup Polls
 * @apiSchema {jsonschema=../../schemas/polls.create.request.json} apiParam
 * @apiSchema {jsonschema=../../schemas/polls.create.response.json} apiSuccess
 */
function createPollAction({ params }) {
  return Promise.resolve(params);
}

createPollAction.schema = 'polls.create.request';
createPollAction.transports = ['http'];
createPollAction.transportsOptions = {
  http: {
    methods: ['post'],
  },
};

module.exports = createPollAction;
