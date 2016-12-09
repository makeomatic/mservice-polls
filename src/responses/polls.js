const omit = require('lodash/omit');

function modelResponse(poll) {
  return {
    id: poll.get('id'),
    type: 'poll',
    attributes: omit(poll.omit('id')),
  };
}

module.exports = {
  modelResponse,
};
