const express = require('express');

const router = new express.Router();

router.post('/signup', (req, res, next) => {
  res.json({
    message: 'Hello World',
  });
});

module.exports = router;
