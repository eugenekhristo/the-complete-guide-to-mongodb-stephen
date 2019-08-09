const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Assotiations test', () => {
  let serj, blogPost, comment;

  beforeEach(async () => {
    await mongoose.connection.collections.blogposts.drop();
    await mongoose.connection.collections.comments.drop();

    serj = new User({ name: 'Serj' });
    blogPost = new BlogPost({
      title: 'Sky is over',
      content: 'Sky is over fucking over!'
    });
    comment = new Comment({ content: 'This is just fucking awesome!' });

    serj.blogPosts.push(blogPost.id);
    blogPost.comments.push(comment.id);
    blogPost.user = serj.id;
    comment.user = serj.id;

    await Promise.all([serj.save(), blogPost.save(), comment.save()]);
  });

  it('Should get all nested graph of assotiations related to a user', async () => {
    serj = await User.findOne({ name: 'Serj' }).populate({
      path: 'blogPosts',
      select: '-__v -user',
      populate: {
        path: 'comments',
        model: 'Comment',
        select: '-__v',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name'
        }
      }
    });

    assert(serj.name === 'Serj');
    assert(serj.blogPosts[0].title === 'Sky is over');
    assert(
      serj.blogPosts[0].comments[0].content === 'This is just fucking awesome!'
    );
    assert(serj.blogPosts[0].comments[0].user.name === 'Serj');
  });
});
