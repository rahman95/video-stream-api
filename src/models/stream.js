const mongoose = require('mongoose');

// Define Schema
const streamSchema = new mongoose.Schema({
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Indexes
streamSchema.index({
  updatedAt: 1,
  createdAt: 1,
});

module.exports = mongoose.model('Stream', streamSchema);
