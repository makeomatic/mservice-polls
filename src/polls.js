const { globFiles } = require('ms-conf/lib/load-config');
const merge = require('lodash/merge');
const MService = require('mservice');
const path = require('path');

const defaultConfig = globFiles(path.resolve(__dirname, 'configs'));

class Polls extends MService {
  constructor(config = {}) {
    super(merge({}, defaultConfig, config));
  }
}

module.exports = Polls;
