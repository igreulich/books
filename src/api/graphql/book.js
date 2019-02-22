module.exports = buildSchema => ({
  bookSchema: buildSchema(`
    type Book {
      id: ID
      title: String
      author: String
      series: String
      number: Int
    }
    type Query {
      book(id: ID): Book
    }`),
  bookQuery: `
    {
      book {
        title
        series
        number
      }
    }`,
});
