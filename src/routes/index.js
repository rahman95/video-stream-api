const express = require('express');
const swaggerUi = require('swagger-ui-express');

// Middlewares
const checkUserToken = require('./../middlewares/checkUserToken');
const checkStreamIdentifier = require('../middlewares/checkStreamIdentifier');
const checkUserCanStream = require('./../middlewares/checkUserCanStream');

// Controllers
const userController = require('./../controllers/userController');
const streamController = require('./../controllers/streamController');

const router = express.Router();
const openApiSpec = require('./../../api/openapi.json');

// Api Docs
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(openApiSpec));

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
  checkStreamIdentifier,
  checkUserCanStream,
  streamController.persist,
);
router.delete(
  '/stream/:stream/user/:token',
  checkUserToken,
  checkStreamIdentifier,
  streamController.destroy,
);

// Catch all route
router.all('*', (req, res) => {
  res.status(404).send('Error - Not Found');
});

module.exports = router;
