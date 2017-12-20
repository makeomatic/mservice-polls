const Errors = require('common-errors');

const defaultOptions = {
  require: true,
  key: {
    // modelKey: requestKey
    id: 'id',
  },
  setTo: 'model',
  relations: [],
};

const keysReducer = (keys, request) => (query, key) => {
  const requestKey = keys[key];
  const requestValue = request[requestKey];

  if (requestValue === undefined) {
    throw new Errors.NotFoundError(`Key '${requestKey}' not found in request`);
  }

  // eslint-disable-next-line no-param-reassign
  query[key] = requestValue;

  return query;
};

module.exports = function factory(modelName, options = {}) {
  return function fetcher(request) {
    const Model = this.bookshelf.model(modelName);
    const settings = Object.assign({}, defaultOptions, options);

    if (Model === undefined) {
      throw new Errors.ArgumentError('model');
    }

    const params = request.params ? request.params : request.query;
    const query = Object
      .keys(settings.key)
      .reduce(keysReducer(settings.key, params), {});

    return Model
      .forge(query)
      .fetch({
        withRelated: settings.relations,
      })
      .then((value) => {
        if (value === null && settings.require) {
          throw new Errors.NotFoundError(`Entity '${modelName}' not found`);
        }

        return value;
      })
      // eslint-disable-next-line no-param-reassign
      .tap(value => (request[settings.setTo] = value));
  };
};
