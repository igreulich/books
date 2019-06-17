exports.up = async (knex) => {
  await knex.schema.createTable('books_authors', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('book_id').unsigned().references('books.id');
    t.integer('authors_id').unsigned().references('authors.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('books_authors');
};
