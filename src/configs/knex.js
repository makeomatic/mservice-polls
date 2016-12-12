const path = require('path');

module.exports = {
  knex: {
    client: 'pg',
    connection: 'postgres://postgres@pg:5432/postgres',
    migrations: {
      tableName: 'migrations-polls',
      directory: path.resolve(__dirname, '../migrations'),
    },
  },
};
