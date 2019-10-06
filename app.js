const express = require('express');
const routes = require('./src/routes');
const config = require('./config.json');

const app = express();
const routerPrefix = config.router.prefix;

app.use(routerPrefix, routes);

module.exports = app;
