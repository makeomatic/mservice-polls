function transform(user) {
  return {
    id: user.get('userId'),
    type: 'user',
  };
}

function collectionResponse(data) {
  const meta = Object.assign({ count: data.models.length }, data.pagination);

  return {
    meta,
    data: data.map(user => transform(user)),
  };
}

module.exports = {
  collectionResponse,
};
