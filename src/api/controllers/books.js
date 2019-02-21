const connection = require('../../../config.js');

module.exports = {
  all: (req, res) => {
    connection.query('SELECT * FROM books',
      (err, rows) => {
        if (err) {
          res
            .status(400)
            .send(err);
        } else {
          res.setHeader('Content-Type', 'application/json');
          res
            .status(200)
            .send(JSON.stringify({
              result: 'success',
              data: rows,
            }));
        }
      });
  },

  create: (req, res, next) => { // eslint-disable-line no-unused-vars
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
      connection.query('INSERT INTO books (title) VALUES (?)', [title], (err, result) => {
        handleSuccessOrErrorMessage(err, result, res); // eslint-disable-line no-use-before-define
      });
    }
  },

  get: (req, res) => {
    connection.query('SELECT * from books where id = ?', [req.params.id], (err, rows) => {
      res.setHeader('Content-Type', 'application/json');
      res
        .status(200)
        .send(JSON.stringify({
          result: 'success',
          data: rows[0],
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
      connection.query('UPDATE books SET title = ? WHERE id = ?', [title, id], (err, result) => {
        handleSuccessOrErrorMessage(err, result, res); // eslint-disable-line no-use-before-define
      });
    }
  },

  destroy: (req, res) => {
    connection.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, result) => {
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
