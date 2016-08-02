const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  auth: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
});

userSchema.pre('save', function(next) {
  if (!this.isModified('auth.password')) {
    return next();
  }

  return bcrypt.hash(this.auth.password, 8, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    this.auth.password = hashedPassword;
    return next();
  });
});

userSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.auth.password, (err, data) => {
      if (err) {
        return reject(err);
      }
      if (data === false) {
        return reject(new Error('Password did not match'));
      }
      return resolve(this);
    });
  });
};

module.exports = mongoose.model('User', userSchema);
