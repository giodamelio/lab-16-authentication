const express = require('express');
const boom = require('boom');
const debug = require('debug')('cf:routes:auth');

const User = require('../models/user');

const router = new express.Router();

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
      savedUser = savedUser.toObject();
      debug(`Created new user: ${savedUser.username}`);
      delete savedUser.auth;
      res.json(savedUser);
    })
    .catch((err) => {
      debug('Error:', err);
      next(boom.badRequest('Invalid user data'));
    });
});

module.exports = router;
