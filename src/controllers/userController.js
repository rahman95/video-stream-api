const userModel = require('./../models/user');
const { createToken } = require('./../utils/helpers');

const userController = {
  create: async (req, res) => {
    const userData = { token: createToken() };
    await userModel.create(userData);

    return res.status(200).json(userData);
  },
  show: async (req, res) => {
    const token = req.params.token;

    // If not token, return early
    if (!token || token.length < 1) {
      return res.status(400).send('Error - No token passed');
    }

    const user = await userModel.findOne({ token }).exec();

    // If no user found with that token, return early
    if (!user) {
      return res.status(404).send('Error - Not Found');
    }

    const { streamCount, streams } = user.toObject();

    return res.status(200).json({ streamCount, streams });
  },
};

module.exports = userController;
