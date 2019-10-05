const userModel = require('./../models/user');

const check = async (req, res, next) => {
  const token = req.params.token;

  // If not token, return early
  if (!token) {
    return res.status(400).send('Error - No token passed');
  }

  // If no user found with that token, return early
  const user = await userModel.findOne({ token }).exec();
  if (!user) {
    return res.status(404).send('Error - Not Found');
  }

  // If user found, attach on to response and pass on to next function
  res.locals.user = user;

  next();
};

module.exports = check;
