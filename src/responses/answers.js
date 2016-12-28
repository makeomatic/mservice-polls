function transform(answer) {
  return {
    id: answer.get('id'),
    type: 'pollAnswer',
    attributes: answer.omit('id'),
  };
}

function modelResponse(poll) {
  return {
    data: transform(poll),
  };
}

function responseWithVotesCount(answers, answersMeta) {
  const response = {
    meta: { answers: answersMeta },
    data: answers.sortBy('position').map(transform),
  };

  return response;
}

module.exports = {
  modelResponse,
  responseWithVotesCount,
};
