const { graphql, buildSchema } = require('graphql');

const { booksSchema, booksQuery } = require('../graphql/books')(buildSchema);
const { bookSchema, bookQuery } = require('../graphql/book')(buildSchema);
const Book = require('../models/book');

module.exports = {
  all: (req, res) => {
    Book.query().asCallback(async (err, rows) => {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        const response = await graphql(booksSchema, booksQuery, { books: rows });

        res.setHeader('Content-Type', 'application/json');
        res
          .status(200)
          .send(JSON.stringify({
            result: 'success',
            data: response.data,
          }));
      }
    });
  },

  create: (req, res) => {
    const { title } = req.body;
    let response;

    if (typeof title === 'undefined') {
      response = {
        result: 'error',
        msg: 'Please fill required details',
      };

      res.setHeader('Content-Type', 'application/json');
      res
        .status(200)
        .send(JSON.stringify(response));
    } else {
      Book.query().insert({ title }).asCallback((err, result) => {
        handleSuccessOrErrorMessage(err, result, res); // eslint-disable-line no-use-before-define
      });
    }
  },

  show: (req, res) => {
    Book.query().where({ id: req.params.id }).asCallback(async (err, rows) => {
      const response = await graphql(bookSchema, bookQuery, { book: rows[0] });

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify({
        result: 'success',
        data: response.data,
      }));
    });
  },

  update: (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    if (typeof title === 'undefined') {
      const response = {
        msg: 'Please fill required information',
      };

      res.setHeader('Content-Type', 'application/json');
      res.send(200, JSON.stringify(response));
    } else {
      Book.query().updateAndFetchById(id, { title }).asCallback((err, result) => {
        handleSuccessOrErrorMessage(err, result, res); // eslint-disable-line no-use-before-define
      });
    }
  },

  destroy: (req, res) => {
    Book.query().where({ id: req.params.id }).delete().asCallback((err, result) => {
      handleSuccessOrErrorMessage(err, result, res); // eslint-disable-line no-use-before-define
    });
  },
};

function handleSuccessOrErrorMessage(err, result, res) {
  if (err) {
    res
      .status(400)
      .send(err);
  } else {
    const response = { result: 'success' };

    res.setHeader('Content-Type', 'application/json');
    res
      .status(200)
      .send(JSON.stringify(response));
  }
}
