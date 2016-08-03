const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const debug = require('debug')('cf:server');

if (!process.env.SECRET) {
  console.log('You must set a SECRET enviroment variable');
  process.exit(1);
}

const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));

server.use('/api', require('./routes/auth'));
server.use('/api/cars', require('./routes/cars'));

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  debug(err);
  return res.status(500).json({
    error: 'Internal Server Error',
  });
});

module.exports = server;
