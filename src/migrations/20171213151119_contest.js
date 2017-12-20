exports.up = knex =>
  knex.schema
    .createTable('contest', (table) => {
      table.increments('id');
      table.string('prize').notNullable();
      table.string('ownerId').index().notNullable();
      table.integer('state').notNullable();
      table.jsonb('meta').notNullable();
      table.boolean('onlyFollowers').notNullable().defaultTo(false);
      table.boolean('hasQuestions').notNullable().defaultTo(false);
      table.integer('nWinners').notNullable().defaultTo(1);
      table.dateTime('startedAt');
      table.dateTime('endedAt');
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex => knex.schema.dropTable('contests');
