exports.up = async (knex) => {
  await knex.schema.createTable('books', (t) => {
    t.increments('id').unsigned().primary();
    t.string('title').notNull();
    t.string('author').notNull();
    t.string('series');
    t.integer('number');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('books');
};
