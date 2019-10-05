const mongoose = require('mongoose');
const dayjs = require('dayjs');
const config = require('./../../config.json');

// Define Schema
const streamSchema = new mongoose.Schema({
  updatedAt: {
    type: Date,
    default: Date.now,
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

//Define methods on model
streamSchema.methods.isValid = function() {
  // Parse currently set updatedAt
  const now = dayjs();
  const updatedAt = dayjs(this.updatedAt);

  // create date instance of now with heartbeat maxInterval seconds
  const keepAliveMaxInterval = config.streams.keepAlive.maxInterval;
  const maxValidDate = updatedAt.add(keepAliveMaxInterval, 'second');

  // compare and see if passed it or if valid
  return maxValidDate.isAfter(now);
};

streamSchema.methods.keepAlive = async function() {
  // create new date instance with heartbeat maxInterval seconds added to it
  const now = dayjs();
  const keepAliveMaxInterval = config.streams.keepAlive.maxInterval;
  const maxValidDate = now.add(keepAliveMaxInterval, 'second');

  // update model instance with new date instance
  return await this.updateOne({ updatedAt: maxValidDate }).exec();
};

module.exports = mongoose.model('Stream', streamSchema);
