const streamModel = require('./../models/stream');

const streamController = {
  create: async (req, res) => {
    const { user } = res.locals;
    const { streams } = user;
    const newStream = await streamModel.create({});

    // add new stream to exisiting user list and update
    streams.push(newStream._id);
    await user.updateOne({ streams });

    res.status(200).json({ stream: newStream._id });
  },
  persist: async (req, res) => {
    const { stream } = res.locals;

    await stream.keepAlive();

    res.status(200).json({ success: true });
  },
  destroy: async (req, res) => {
    const { user, stream } = res.locals;
    const { streams } = user;

    // remove stream from streams list on user
    const updatedStreams = streams.filter(currentStream => {
      return currentStream !== stream._id;
    });

    await user.updateOne({ streams: updatedStreams });
    await streamModel
      .findOneAndRemove({ _id: stream.id }, { useFindAndModify: false })
      .exec();

    res.status(200).json({ success: true });
  },
};

module.exports = streamController;
