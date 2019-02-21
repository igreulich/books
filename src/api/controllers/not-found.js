module.exports.show = (req, res, next) => { // eslint-disable-line no-unused-vars
  res.setHeader('Content-Type', 'application/json');
  res
    .status(404)
    .send(JSON.stringify({
      result: 'Not Found',
      data: null,
    }));
};
