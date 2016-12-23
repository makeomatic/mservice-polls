const Promise = require('bluebird');
const qs = require('qs');

function preValidate(request) {
  if (request.query) {
    const { transformQuery } = request.action;
    let query = qs.parse(request.query);

    if (transformQuery) {
      query = transformQuery(query);
    }

    // eslint-disable-next-line no-param-reassign
    request.query = query;
  }

  return Promise.resolve(request);
}

module.exports = [
  {
    point: 'preValidate',
    handler: preValidate,
  },
];
