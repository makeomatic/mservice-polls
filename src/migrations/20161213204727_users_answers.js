exports.up = knex =>
  knex.schema
    .createTable('polls_users_answers', (table) => {
      table.increments('id');
      table.integer('answerId').index().references('polls_answers.id').notNullable();
      table.string('userId').notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex => knex.schema.dropTable('polls_users_answers');
