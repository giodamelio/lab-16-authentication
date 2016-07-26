const mongoose = require('mongoose');

const server = require('./server');

mongoose.Promise = global.Promise; // Make mongoose use native promises
mongoose.connect('mongodb://localhost/simpleauth');

const port = 3141;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
