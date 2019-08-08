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
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'BlogPost'
    }
  ]
});

userSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
