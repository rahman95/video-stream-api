const express = require('express');
const middlewares = require('./../middlewares');
const userController = require('./../controllers/userController');
const streamController = require('./../controllers/streamController');

const router = express.Router();

// Testing
router.get('/', function(req, res) {
  res.send('Hello World!');
});

// API Routes
router.get('/user', userController.create);
router.get('/user/:token', userController.show);
router.get('/stream/user/:token', streamController.create);
router.patch('/stream/:stream/user/:token', streamController.persist);
router.delete('/stream/:stream/user/:token', streamController.destroy);

module.exports = router;
