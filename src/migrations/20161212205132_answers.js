exports.up = knex =>
  knex.schema
    .createTable('polls_answers', (table) => {
      table.increments('id');
      table.string('title').notNullable();
      table.integer('pollId').index().references('polls.id').notNullable();
      table.integer('position').notNullable();
      table.jsonb('meta').notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex => knex.schema.dropTable('polls_answers');
