module.exports = buildSchema => ({
  booksSchema: buildSchema(`
    type Book {
      id: ID
      title: String
      author: String
      series: String
      number: Int
    }
    type Query {
      books(id: ID): [Book]
    }`),
  booksQuery: `
    {
      books {
        id
        title
      }
    }`,
});
