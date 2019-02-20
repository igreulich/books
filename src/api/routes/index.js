const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.render('index', { title: 'The Grey Library' });
});

module.exports = router;
