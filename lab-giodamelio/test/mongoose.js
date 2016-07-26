const mongoose = require('mongoose');

process.env.DEBUG = ''; // Hide debug messages during the tests

mongoose.Promise = global.Promise; // Make mongoose use native promises
mongoose.connect('mongodb://localhost/simpleauth_test');
