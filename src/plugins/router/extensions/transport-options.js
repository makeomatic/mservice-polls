const { NotSupportedError } = require('common-errors');

function postRequest(error, request, route) {
  const result = Promise.resolve([error, request, route]);

  if (error) {
    return result;
  }

  const { method, transport, action } = request;

  if (action.transportsOptions === undefined) {
    return result;
  }

  const transportOptions = action.transportsOptions[transport];

  if (transportOptions === undefined) {
    return result;
  }

  if (transportOptions.methods.includes(method) === false) {
    throw new NotSupportedError(`Route ${route} method ${method}`);
  }

  return result;
}

module.exports = [
  {
    point: 'postRequest',
    handler: postRequest,
  },
];
