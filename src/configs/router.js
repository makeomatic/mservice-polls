const { ActionTransport, routerExtension } = require('mservice');
const path = require('path');
const tokenAuth = require('../plugins/router/auth/strategies/token');
const transportOptionsExtension = require('../plugins/router/extensions/transport-options');
const fetcherExtension = require('../plugins/router/extensions/fetcher');
const allowedExtension = require('../plugins/router/extensions/allowed');

const { http } = ActionTransport;

module.exports = {
  router: {
    routes: {
      directory: path.resolve(__dirname, './../actions'),
      prefix: '',
      transports: [http],
    },
    extensions: {
      enabled: ['preRequest', 'postRequest', 'postValidate', 'postAuth', 'preResponse'],
      register: [
        routerExtension('audit/log'),
        allowedExtension,
        transportOptionsExtension,
        fetcherExtension,
      ],
    },
    auth: {
      strategies: {
        token: tokenAuth,
      },
    },
  },
};
