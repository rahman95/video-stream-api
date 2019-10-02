const streamController = {
  create: (req, res) => {
    res.send('Return New Stream');
  },
  persist: (req, res) => {
    res.send('Persist current stream');
  },
  destroy: (req, res) => {
    res.send('Invalidate current user stream');
  },
};

module.exports = streamController;
