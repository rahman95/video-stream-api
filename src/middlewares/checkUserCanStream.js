const check = async (req, res, next) => {
  //get user from res, set by previous middleware
  let { user } = res.locals;

  if (!user) {
    return res.status(400).send('Error - No User found');
  }

  user = await user.removeExpiredStreams();

  if (!user.canStream()) {
    return res.status(403).send('Error - Forbidden');
  }

  // Attach updated user
  res.locals.user = user;

  next();
};

module.exports = check;
