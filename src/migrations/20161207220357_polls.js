exports.up = knex =>
  knex.schema
    .createTable('polls', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
      table.string('ownerId').notNullable();
      table.string('status').notNullable();
      table.boolean('multipleAnswers').notNullable();
      table.dateTime('startedAt').notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex => knex.schema.dropTable('polls');
