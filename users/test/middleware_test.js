const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let serj, blogPost;

  beforeEach(async () => {
    await mongoose.connection.collections.blogposts.drop();

    serj = new User({ name: 'Serj' });
    blogPost = new BlogPost({
      title: 'Sky is over',
      content: 'Sky is over fucking over!'
    });

    serj.blogPosts.push(blogPost.id);
    blogPost.user = serj.id;

    await Promise.all([serj.save(), blogPost.save()]);
  });

  it('should remove user and all their blog posts', async () => {
    await serj.remove();
    const blogPostsCount = await BlogPost.countDocuments();
    assert(blogPostsCount === 0);
  });
});
