const Bookshelf = require('bookshelf');
const cascadeDelete = require('bookshelf-cascade-delete');
const { globFiles } = require('ms-conf/lib/load-config');
const merge = require('lodash/merge');
const modelAnswer = require('./models/answer');
const modelPoll = require('./models/poll');
const modelUserAnswer = require('./models/user-answer');
const modelContest = require('./models/contest');
const modelUserContest = require('./models/user-contest');
const { NotFoundError } = require('common-errors');
const MService = require('mservice');
const path = require('path');
const ServiceAllowed = require('./services/allowed');
const ServiceAnswers = require('./services/answers');
const ServiceBroadcast = require('./services/broadcast');
const ServicePolls = require('./services/polls');
const ServiceUsersAnswers = require('./services/users-answers');
const ServiceContest = require('./services/contest');
const ServiceUsersContest = require('./services/users-contest');

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
    bookshelf.model('Answer', ...modelAnswer);
    bookshelf.model('Poll', ...modelPoll);
    bookshelf.model('UserAnswer', modelUserAnswer);
    bookshelf.model('Contest', ...modelContest);
    bookshelf.model('UserContest', modelUserContest);

    // services
    services.set(this, new Map());
    this.service('allowed', new ServiceAllowed(this.config.allowed));
    this.service('answers', new ServiceAnswers(bookshelf));
    this.service('polls', new ServicePolls(bookshelf));
    this.service('usersAnswers', new ServiceUsersAnswers(bookshelf));
    this.service('contest', new ServiceContest(bookshelf));
    this.service('usersContest', new ServiceUsersContest(bookshelf));
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
