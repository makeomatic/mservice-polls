const { ActionTransport, routerExtension } = require('mservice');
const path = require('path');
const tokenAuth = require('../plugins/router/auth/strategies/token');
const transportOptionsExtension = require('../plugins/router/extensions/transport-options');
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
      enabled: ['preRequest', 'postRequest', 'postAuth', 'preResponse'],
      register: [
        routerExtension('audit/log'),
        transportOptionsExtension,
        allowedExtension,
      ],
    },
    auth: {
      strategies: {
        token: tokenAuth,
      },
    },
  },
};
