const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

module.exports = mongoose.model('User', userSchema);
