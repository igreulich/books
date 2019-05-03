const { Model } = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = Author;
