const userModel = require('./../models/user');
const { createToken } = require('./../utils/helpers');

const userController = {
  create: async (req, res) => {
    const userData = { token: createToken() };
    await userModel.create(userData);

    return res.status(200).json(userData);
  },
  show: async (req, res) => {
    const user = res.locals.user;
    const { streamCount, streams } = user.toObject();

    return res.status(200).json({ streamCount, streams });
  },
};

module.exports = userController;
