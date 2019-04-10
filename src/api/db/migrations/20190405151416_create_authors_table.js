exports.up = async (knex) => {
  await knex.schema.createTable('authors', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name').notNull();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('authors');
};
