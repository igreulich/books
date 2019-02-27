const { gql } = require('apollo-server-express');

const Book = require('../models/book');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    series: String
    number: Int
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(title: String!, series: String): Book!
    updateBook(id: ID!, title: String, series: String): Book!
    deleteBook(id: ID!): Int!
  }
`;

const resolvers = {
  Query: {
    books: () => Book.query(),
    book: (_, id) => Book.query().where(id).then(res => res[0]),
  },
  Mutation: {
    updateBook: (_, { id, title, series }) => (
      Book.query().updateAndFetchById(id, { title, series })
    ),
    createBook: (_, { title, series }) => (
      Book.query().insert({ title, series })
    ),
    deleteBook: (_, { id }) => Book.query().where({ id }).delete(),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
