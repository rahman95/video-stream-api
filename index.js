const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Connect to Mongo
try {
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.error(err.message);
}

// Start up express server
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
