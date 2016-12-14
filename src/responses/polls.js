const { modelResponse: answerResponse } = require('./answers');

function transform(poll) {
  return {
    id: poll.get('id'),
    type: 'poll',
    attributes: poll.omit('id'),
    relations: {
      answers: {
        data: poll
          .related('answers')
          .sortBy('position')
          .map(answerResponse)
          .map(response => response.data),
      },
    },
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
