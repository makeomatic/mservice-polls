const omit = require('lodash/omit');

function transform(poll) {
  return {
    id: poll.get('id'),
    type: 'poll',
    attributes: omit(poll.omit('id')),
  };
}

function modelResponse(poll) {
  return {
    data: transform(poll),
  };
}

function collectionResponse(data) {
  const meta = Object.assign({ count: data.models.length }, data.pagination);

  return {
    meta,
    data: data.models.map(poll => transform(poll)),
  };
}

module.exports = {
  collectionResponse,
  modelResponse,
};
