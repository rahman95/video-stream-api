const userController = {
  create: (req, res) => {
    res.send('Return User Token');
  },
  show: (req, res) => {
    res.send('Return All User Streams');
  },
};

module.exports = userController;
