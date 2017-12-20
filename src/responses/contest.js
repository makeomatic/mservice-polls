const { modelResponse: pollResponse } = require('./polls');

function transform(contest) {
  return {
    id: contest.get('id'),
    type: 'contest',
    attributes: contest.omit('id'),
    relations: {
      users: {
        data: contest
          .related('users')
          .sortBy('id')
          .map(user => user.get('userId')),
      },
      poll: pollResponse(contest.related('poll')),
    },
  };
}

function modelResponse(contest) {
  return {
    data: transform(contest),
  };
}

function collectionResponse(data) {
  const meta = Object.assign({ count: data.models.length }, data.pagination);

  return {
    meta,
    data: data.models.map(contest => transform(contest)),
  };
}

function responseWithSubCount(contest, subMeta) {
  const response = {
    meta: subMeta,
    data: transform(contest),
  };

  return response;
}

module.exports = {
  collectionResponse,
  modelResponse,
  responseWithSubCount,
};
