function transform(poll) {
  return {
    id: poll.get('id'),
    type: 'pollAnswer',
    attributes: poll.omit('id'),
  };
}

function modelResponse(poll) {
  return {
    data: transform(poll),
  };
}

module.exports = {
  modelResponse,
};
