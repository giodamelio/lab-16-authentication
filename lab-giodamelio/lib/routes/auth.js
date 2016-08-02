const express = require('express');
const boom = require('boom');
const debug = require('debug')('cf:routes:auth');
const JWT = require('jsonwebtoken');

const User = require('../models/user');

const router = new express.Router();

// Create a jwt token from user information
const createToken = function(req, res, next) {
  const user = req.user.toObject();
  delete user.auth;
  JWT.sign(user, process.env.SECRET, {}, (err, token) => {
    if (err) {
      return next(boom.unauthorized());
    }

    return res.json({
      token,
    });
  });
};

router.post('/signup', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    auth: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  user.save()
    .then((savedUser) => {
      debug(`Created new user: ${savedUser.username}`);
      req.user = savedUser;
      next();
    })
    .catch(() => {
      next(boom.badRequest('Invalid user data'));
    });
}, createToken);

module.exports = router;
