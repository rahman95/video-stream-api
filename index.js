const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Connect to Mongo
mongoose.connect(process.env.DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', err => {
  console.error(err.message);
});

// Start up express server
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
