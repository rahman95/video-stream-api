const mongoose = require('mongoose');
const app = require('./app');

// TODO: Set-up Mongoose here
// mongoose.connect(process.env.DATABASE);
// mongoose.connection.on('error', (err) => {
//   console.error(err.message);
// });

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
