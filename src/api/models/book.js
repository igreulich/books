const { Model } = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = Book;
