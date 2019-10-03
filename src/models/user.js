const mongoose = require('mongoose');
const validator = require('validator');

// Define Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: true,
  },
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
  email: 1,
  token: 1,
});

// Add virtual field to compute streams
userSchema.virtual('streamCount').get(function() {
  return this.streams.length;
});

module.exports = mongoose.model('User', userSchema);
