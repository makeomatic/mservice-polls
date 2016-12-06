const assert = require('assert');
const Polls = require('../src');

const polls = new Polls();
const { knex } = polls;
const name = process.argv[2];

assert(name, 'Migration name must be specified');

knex.migrate
  .make(name)
  .then((info) => {
    polls.log.info('Create migration:', info);
    process.exit();
  });
