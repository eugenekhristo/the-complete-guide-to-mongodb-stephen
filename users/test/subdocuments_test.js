const assert = require('assert');
const User = require('../src/user');

describe('Test subdocuments', () => {
  it('Should save subdocuments of PostSchema', async () => {
    const serj = new User({ name: 'Serj', posts: [{ title: 'SOAD ROCKS!' }] });
    await serj.save();
    const user = await User.findOne({ name: 'Serj' });
    assert(user.posts[0].title === 'SOAD ROCKS!');
  });
});
