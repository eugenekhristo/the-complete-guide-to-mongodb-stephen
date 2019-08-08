const assert = require('assert');
const User = require('../src/user');

describe('Testing virtual types', () => {
  it('postCount must return actual number of posts', async () => {
    let user = new User({
      name: 'Serj',
      posts: [{ title: 'Sky is Over' }, { title: 'BYOB' }]
    });
    await user.save();

    user = await User.findOne({ name: 'Serj' });
    assert(user.postCount === 2);
  });
});
