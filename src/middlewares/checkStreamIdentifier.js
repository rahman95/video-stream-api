const streamModel = require('./../models/stream');

const check = async (req, res, next) => {
  const streamId = req.params.stream;

  // If not streamId, return early
  if (!streamId) {
    return res.status(400).send('Error - No stream identifier passed');
  }

  //check if stream exists or return early
  const stream = await streamExists(streamId);
  if (!stream) {
    return res.status(404).send('Error - Not Found');
  }

  //check if stream is valid or return early
  if (!stream.isValid()) {
    return res.status(403).send('Error - Forbidden');
  }

  // If stream found, attach on to response and pass on to next function
  res.locals.stream = stream;

  next();
};

const streamExists = async streamId => {
  try {
    return await streamModel.findById(streamId).exec();
  } catch (err) {
    return false;
  }
};

module.exports = check;
