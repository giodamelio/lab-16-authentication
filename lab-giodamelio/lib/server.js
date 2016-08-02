const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const server = express();

server.use('/api', require('./routes/auth'));

server.use(bodyParser.json());
server.use(morgan('dev'));

module.exports = server;
