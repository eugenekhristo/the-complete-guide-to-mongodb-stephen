const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  postCount: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
