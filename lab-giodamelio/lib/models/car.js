const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  color: {
    type: String,
  },
});

module.exports = mongoose.model('Car', carSchema);
