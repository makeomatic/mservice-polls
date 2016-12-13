const Bookshelf = require('bookshelf');
const cascadeDelete = require('bookshelf-cascade-delete');
const { globFiles } = require('ms-conf/lib/load-config');
const merge = require('lodash/merge');
const modelPoll = require('./models/poll');
const modelAnswer = require('./models/answer');
const { NotFoundError } = require('common-errors');
const MService = require('mservice');
const path = require('path');
const ServiceAllowed = require('./services/allowed');
const ServiceAnswers = require('./services/answers');
const ServiceBroadcast = require('./services/broadcast');
const ServicePolls = require('./services/polls');

const { ConnectorsTypes } = MService;
const defaultConfig = globFiles(path.resolve(__dirname, 'configs'));
const services = new WeakMap();

class Polls extends MService {
  constructor(config = {}) {
    super(merge({}, defaultConfig, config));

    // migrations
    this.addConnector(ConnectorsTypes.migration, () => this.migrate('knex'));

    // models
    const bookshelf = this.bookshelf = Bookshelf(this.knex);
    bookshelf.plugin(cascadeDelete);
    bookshelf.plugin('pagination');
    bookshelf.plugin('registry');
    bookshelf.model('Poll', ...modelPoll);
    bookshelf.model('Answer', modelAnswer);

    // services
    services.set(this, new Map());
    this.service('allowed', new ServiceAllowed(this.config.allowed));
    this.service('answers', new ServiceAnswers(bookshelf));
    this.service('polls', new ServicePolls(bookshelf));
    this.on('plugin:connect:amqp', (amqp) => {
      this.service('broadcast', new ServiceBroadcast(this.config.broadcast, amqp));
    });
  }

  service(name, instance) {
    const classServices = services.get(this);

    if (instance) {
      classServices.set(name, instance);
    }

    if (classServices.has(name) === false) {
      throw new NotFoundError(`Service ${name}`);
    }

    return classServices.get(name);
  }
}

module.exports = Polls;
