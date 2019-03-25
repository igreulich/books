const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { typeDefs, resolvers } = require('./src/api/graphql/schema');
const db = require('./src/api/db/knex');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'api', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.applyMiddleware({ app });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
