const omit = require('lodash/omit');

function modelResponse(poll) {
  return {
    id: poll.id,
    type: 'poll',
    attributes: omit(poll.omit('id')),
  };
}

module.exports = {
  modelResponse,
};
