const { ActionTransport, routerExtension } = require('mservice');
const path = require('path');
const tokenAuth = require('../plugins/router/auth/strategies/token');
const transportOptionsExtension = require('../plugins/router/extensions/transport-options');
const fetcherExtension = require('../plugins/router/extensions/fetcher');
const allowedExtension = require('../plugins/router/extensions/allowed');
const qsParserExtension = require('../plugins/router/extensions/query-string-parser');

const { http } = ActionTransport;

module.exports = {
  router: {
    routes: {
      directory: path.resolve(__dirname, './../actions'),
      prefix: '',
      transports: [http],
    },
    extensions: {
      enabled: [
        'preRequest',
        'postRequest',
        'preValidate',
        'postValidate',
        'postAuth',
        'preResponse',
      ],
      register: [
        routerExtension('audit/log'),
        allowedExtension,
        transportOptionsExtension,
        fetcherExtension,
        qsParserExtension,
      ],
    },
    auth: {
      strategies: {
        token: tokenAuth,
      },
    },
  },
};
