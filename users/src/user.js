const mongoose = require('mongoose');
const PostSchema = require('./post');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be more than 2 characters long'
    }
  },
  postCount: Number,
  posts: [PostSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
