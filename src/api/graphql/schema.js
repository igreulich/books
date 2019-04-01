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
    createBook(title: String!, series: String, number: Int): Book!
    updateBook(id: ID!, title: String, series: String, number: Int): Book!
    deleteBook(id: ID!): Int!
  }
`;

const resolvers = {
  Query: {
    books: () => Book.query(),
    book: (_, id) => Book.query().where(id).then(res => res[0]),
  },
  Mutation: {
    updateBook: async (_, { id, title, series, number }) => Book.query().updateAndFetchById(id, { title, series, number }), // eslint-disable-line object-curly-newline
    createBook: async (_, { title, series, number }) => Book.query().insert({ title, series, number }),
    deleteBook: async (_, { id }) => Book.query().where({ id }).delete(),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
