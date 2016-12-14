exports.up = knex =>
  knex.schema
    .createTable('polls', (table) => {
      table.increments('id');
      table.string('title').notNullable();
      table.string('ownerId').index().notNullable();
      table.integer('state').notNullable();
      table.integer('minUserAnswersCount').notNullable();
      table.integer('maxUserAnswersCount').notNullable();
      table.jsonb('meta').notNullable();
      table.dateTime('startedAt');
      table.dateTime('endedAt');
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex => knex.schema.dropTable('polls');
