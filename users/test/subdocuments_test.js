const assert = require('assert');
const User = require('../src/user');

describe('Test subdocuments', () => {
  it('Should save subdocuments of PostSchema', async () => {
    const serj = new User({ name: 'Serj', posts: [{ title: 'SOAD ROCKS!' }] });
    await serj.save();
    const user = await User.findOne({ name: 'Serj' });
    assert(user.posts[0].title === 'SOAD ROCKS!');
  });

  it('Should add a new post subdocument to an existing User collection', async () => {
    const serj = new User({ name: 'Serj' });
    await serj.save();

    let user = await User.findOne({ name: 'Serj' });
    user.posts.push({ title: 'Arials in the Sky' });
    await user.save();

    user = await User.findOne({ name: 'Serj' });
    assert(user.posts[0].title === 'Arials in the Sky');
  });

  it('should remove existing subdocument', async () => {
    const serj = new User({ name: 'Serj', posts: [{ title: 'SOAD ROCKS!' }] });
    await serj.save();

    let user = await User.findOne({ name: 'Serj' });
    // user.posts = user.posts.filter(post => post.title !== 'SOAD ROCKS!');
    user.posts[0].remove();
    await user.save();

    user = await User.findOne({ name: 'Serj' });
    assert(user.posts.length === 0);
  });
});
