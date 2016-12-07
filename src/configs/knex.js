const path = require('path');

module.exports = {
  knex: {
    client: 'pg',
    connection: 'postgres://postgres@pg:5432/postgres',
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname, '../migrations'),
    },
  },
};
