const mongoose = require('mongoose');

before(async () => {
  try {
    await mongoose.connect('mongodb://localhost/muber_test', {
      useNewUrlParser: true
    });
  } catch (error) {
    console.log('FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }
});

beforeEach(async () => {
  try {
    await mongoose.connection.collections.drivers.drop();
  } catch (error) {}
});
