const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use('/', routes);

// TODO: Add env based error handling
// if (app.get('env') === 'development') {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors);
// }

// // production error handler
// app.use(errorHandlers.productionErrors);

module.exports = app;
