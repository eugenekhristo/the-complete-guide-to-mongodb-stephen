const assert = require('assert');
const User = require('../src/user');

describe('Removing users', () => {
  let serj;

  beforeEach(async () => {
    serj = new User({ name: 'Serj' });
    await serj.save();
  });

  it('should remove a user with instance remove() method', async () => {
    await serj.remove();
    const user = await User.findOne({ name: 'Serj' });
    assert(user === null);
  });

  it('should remove a user with class deleteMany() method', async () => {
    await User.deleteMany({ name: 'Serj' });
    const user = await User.findOne({ name: 'Serj' });
    assert(user === null);
  });

  it('should remove a user with class findOneAndDelete() method', async () => {
    await User.findOneAndDelete({ name: 'Serj' });
    const user = await User.findOne({ name: 'Serj' });
    assert(user === null);
  });

  it('should remove a user with class findByIdAndDelete() method', async () => {
    await User.findByIdAndDelete(serj.id);
    const user = await User.findOne({ name: 'Serj' });
    assert(user === null);
  });
});
