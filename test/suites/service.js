const config = require('../configs/service');
const Service = require('../../src');

const service = new Service(config);

describe('service', function suite() {
  it('should be able to connect', () => service.connect());
});
