const mongoose = require('mongoose');
const { createToken } = require('./../utils/helpers');
const config = require('./../../config.json');

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

//Define methods on model
userSchema.methods.removeExpiredStreams = async function() {
  await this.populate('streams').execPopulate();
  const { streams } = this;

  //if empty return early
  if (streams.length < 1) {
    return this;
  }

  const validStreams = streams
    .filter(stream => stream.isValid())
    .map(stream => stream._id);

  this.streams = validStreams;

  return await this.save();
};

userSchema.methods.canStream = function() {
  const maxConcurrentStreams = config.streams.maxConcurrent;

  return this.streamCount < maxConcurrentStreams;
};

module.exports = mongoose.model('User', userSchema);
