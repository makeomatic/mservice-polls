#!/usr/bin/env node

// accepts conf through .env file
// suitable for configuring this in the docker env
const configuration = require('ms-conf');
const Polls = require('../src');

const polls = new Polls(configuration.get('/'));

polls.connect()
  .then(() => {
    const address = polls.http.info;
    polls.log.info(`connected on ${address.address}:${address.port}`);
  })
  .catch((err) => {
    polls.log.fatal('Failed to start service', err);
    setImmediate(() => {
      throw err;
    });
  });
