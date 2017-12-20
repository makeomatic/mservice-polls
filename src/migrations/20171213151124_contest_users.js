exports.up = knex =>
  knex.schema
    .createTable('contest_users', (table) => {
      table.increments('id');
      table.integer('contestId').index().references('contest.id').notNullable();
      table.string('userId').notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex => knex.schema.dropTable('contest_users');
