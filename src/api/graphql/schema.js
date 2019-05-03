const { gql } = require('apollo-server-express');

const { Author, Book } = require('../models');


const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    series: String
    number: Int
  }

  type Author {
    id: ID!
    name: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID): Author
  }

  type Mutation {
    createBook(title: String!, series: String, number: Int): Book!
    updateBook(id: ID!, title: String, series: String, number: Int): Book!
    deleteBook(id: ID!): Int!
    createAuthor(name: String!): Author!
    updateAuthor(id: ID!, name: String): Author!
    deleteAuthor(id: ID!): Int!
  }
`;

const resolvers = {
  Query: {
    books: () => Book.query(),
    book: (_, id) => Book.query().where(id).then(res => res[0]),
    authors: () => Author.query(),
    author: (_, id) => Author.query().where(id).then(res => res[0]),
  },
  Mutation: {
    createBook: async (_, { title, series, number }) => Book.query().insert({ title, series, number }),
    updateBook: async (_, { id, title, series, number }) => Book.query().updateAndFetchById(id, { title, series, number }), // eslint-disable-line object-curly-newline
    deleteBook: async (_, { id }) => Book.query().where({ id }).delete(),
    createAuthor: async (_, { name }) => Author.query().insert({ name }),
    updateAuthor: async (_, { id, name }) => Author.query().updateAndFetchById(id, { name }), // eslint-disable-line object-curly-newline
    deleteAuthor: async (_, { id }) => Author.query().where({ id }).delete(),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
