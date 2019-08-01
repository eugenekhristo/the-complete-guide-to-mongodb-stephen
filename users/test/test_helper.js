const mongoose = require('mongoose');

before(async () => {
  try {
    await mongoose.connect('mongodb://localhost/users_test', {
      useNewUrlParser: true
    });
    console.log(`We are connected to MongoDB...`);
  } catch (error) {
    console.warn(`Something went wrong while connecting to MongoDb`, error);
  }
});

beforeEach(async () => {
  await mongoose.connection.collections.users.drop();
});
