/**
 * @api {amqp} <prefix>.example Example
 * @apiVersion 1.0.0
 * @apiName example
 * @apiGroup Example
 * @apiSchema {jsonschema=../../schemas/example.request.json} apiParam
 * @apiSchema {jsonschema=../../schemas/example.response.json} apiSuccess
 */
function ExampleAction({ params }) {
  return Promise.resolve(params);
}

ExampleAction.schema = 'example';
ExampleAction.transports = ['amqp'];

module.exports = ExampleAction;
