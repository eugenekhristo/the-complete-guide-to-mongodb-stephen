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

userSchema.pre('remove', async function(next) {
  const BlogPost = mongoose.model('BlogPost');
  await BlogPost.deleteMany({_id: {$in: this.blogPosts}});
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
