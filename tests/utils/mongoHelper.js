const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = new MongoMemoryServer();

const createServer = async () => {
  const connectionString = await server.getConnectionString();

  try {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
  }
};

const destroyServer = async () => {
  await mongoose.connection.close();
  await server.stop();
};

module.exports = {
  createServer,
  destroyServer,
};
