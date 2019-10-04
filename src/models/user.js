const mongoose = require('mongoose');
const { createToken } = require('./../utils/helpers');

// Define Schema
const userSchema = new mongoose.Schema({
  token: {
    type: String,
    trim: true,
    required: true,
  },
  streams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stream' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Indexes
userSchema.index({
  token: 1,
});

// Add virtual field to compute streams
userSchema.virtual('streamCount').get(function() {
  return this.streams.length;
});

module.exports = mongoose.model('User', userSchema);
