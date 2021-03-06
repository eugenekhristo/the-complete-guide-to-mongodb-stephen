const assert = require('assert');
const User = require('../src/user');

describe('Finding users', () => {
  let serj;

  beforeEach(async () => {
    serj = User({ name: 'Serj' });
    await serj.save();
  });

  it('Should find all users with a name of Serj', async () => {
    const users = await User.find({ name: 'Serj' });
    assert(users.some(user => user.id === serj.id));
  });

  it('Should find a user by their id', async () => {
    const user = await User.findOne({ _id: serj.id });
    assert(user.name === 'Serj');
  });
});
