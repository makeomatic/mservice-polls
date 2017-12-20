exports.up = knex => 
  knex.schema.table('polls', (table) => {
    table.integer('contestId').index().references('contest.id').defaultTo(null);
  });

exports.down = knex => 
  knex.schema.table('polls', (table) => {
    table.dropColumn('contestId');
  });
