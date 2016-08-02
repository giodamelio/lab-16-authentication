const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));

server.use('/api', require('./routes/auth'));

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  return res.status(500).json({
    error: 'Internal Server Error',
  });
});

module.exports = server;
