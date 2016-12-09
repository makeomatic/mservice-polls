const Promise = require('bluebird');
const qs = require('qs');

function preValidate(request) {
  if (request.query) {
    // eslint-disable-next-line no-param-reassign
    request.query = qs.parse(request.query);
  }

  return Promise.resolve(request);
}

module.exports = [
  {
    point: 'preValidate',
    handler: preValidate,
  },
];
