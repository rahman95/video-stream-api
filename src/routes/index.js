const express = require('express');

// Middlewares
const checkUserToken = require('./../middlewares/checkUserToken');
const checkStreamIdentifier = require('../middlewares/checkStreamIdentifier');
const checkUserCanStream = require('./../middlewares/checkUserCanStream');

// Controllers
const userController = require('./../controllers/userController');
const streamController = require('./../controllers/streamController');

const router = express.Router();

// Testing
router.get('/', function(req, res) {
  res.send('Hello World!');
});

// API Routes
router.get('/user', userController.create);
router.get('/user/:token', checkUserToken, userController.show);
router.get(
  '/stream/user/:token',
  checkUserToken,
  checkUserCanStream,
  streamController.create,
);
router.patch(
  '/stream/:stream/user/:token',
  checkUserToken,
  checkUserCanStream,
  checkStreamIdentifier,
  streamController.persist,
);
router.delete(
  '/stream/:stream/user/:token',
  checkUserToken,
  checkStreamIdentifier,
  streamController.destroy,
);

module.exports = router;
