const assert = require('assert');

const boom = require('boom');

module.exports = function(req, res, next) {
  return new Promise((resolve) => {
    const header = req.headers.authorization;
    assert(header, 'No authorization header provided');
    const splitHeader = header.split(' ');
    assert.equal(splitHeader.length, 2, 'Invalid authorization header');
    assert.equal(splitHeader[0], 'Basic', 'Invalid authorization header');
    const authString = new Buffer(splitHeader[1], 'base64').toString();
    const splitAuthString = authString.split(':');
    assert.equal(splitAuthString.length, 2, 'Invalid authorization header');
    req.auth = {
      email: splitAuthString[0],
      password: splitAuthString[1],
    };
    resolve();
    next();
  })
  .catch(() => {
    next(boom.badRequest('Invalid authorization header'));
  });
};
