const express = require('express');
const middlewares = require('./../middlewares')
const controllers = require('./../controllers');

const router = express.Router();

// API Routes
router.get('/api/v1/stream', controllers.streamController.method);
router.post('/api/v1/stream', controllers.streamController.method);
router.patch('/api/v1/stream', controllers.streamController.method);
router.delete('/api/v1/stream', controllers.streamController.method);

module.exports = router;
