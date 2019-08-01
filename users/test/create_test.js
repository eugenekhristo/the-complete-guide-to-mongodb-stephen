const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('Should save a user', async () => {
    const user = new User({ name: 'Eugene' });
    await user.save();

    assert(!user.isNew);
  });
});
