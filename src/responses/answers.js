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

function responseWithVotesCount(answersData) {
  return answersData
    .reduce((response, answerData) => {
      const { answer, votesCount, userAnswered } = answerData;

      response.data.push(transform(answer));
      response.meta.answers.push({
        userAnswered,
        votesCount: Number(votesCount),
        id: answer.get('id'),
      });

      return response;
    }, { data: [], meta: { answers: [] } });
}

module.exports = {
  modelResponse,
  responseWithVotesCount,
};
