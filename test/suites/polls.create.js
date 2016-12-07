const assert = require('assert');
const config = require('../configs/service');
const Polls = require('../../src');
const request = require('request-promise');

const http = request.defaults({
  uri: 'http://localhost:3000/api/polls/create',
  simple: false,
  resolveWithFullResponse: true,
  json: true,
  method: 'post',
});

const polls = new Polls(config);

describe('polls.create', function suite() {
  before('start up service', () => polls.connect());
  after('shutdown service', () => polls.close());

  it('should be able to return error if invalid method', () => {
    const params = {
      uri: 'http://localhost:3000/api/polls/create',
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      method: 'get',
    };

    return request(params)
      .then(({ body }) => {
        assert.equal(body.statusCode, 500);
        assert.equal(body.name, 'NotSupportedError');
      });
  });

  it('should be able to create poll', () => {
    const body = {};

    return http({ body })
      .then((response) => {
        console.log(response.body);
      });
  });
});
