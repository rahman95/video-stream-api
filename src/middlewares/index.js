const checkUserToken = require('./checkUserToken');
const checkUserCanStream = require('./checkUserCanStream');
const checkStreamIdentifer = require('./checkStreamIdentfier');

const middlewares = {
  checkUserToken,
  checkUserCanStream,
  checkStreamIdentifer,
};

module.exports = middlewares;
