const { ActionTransport, routerExtension } = require('mservice');
const path = require('path');
const transportOptionsExtension = require('../plugins/router/extensions/transport-options');

const { http } = ActionTransport;

module.exports = {
  router: {
    routes: {
      directory: path.resolve(__dirname, './../actions'),
      prefix: '',
      transports: [http],
    },
    extensions: {
      enabled: ['preRequest', 'postRequest', 'preResponse'],
      register: [
        routerExtension('audit/log'),
        transportOptionsExtension,
      ],
    },
  },
};
