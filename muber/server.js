const app = require('./app');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'Test') {
  mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`NodeJS server is listenning on PORT ${PORT}...`)
);
