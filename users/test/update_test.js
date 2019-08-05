const assert = require('assert');
const User = require('../src/user');

describe('Updating users', () => {
  let serj;

  beforeEach(async () => {
    serj = new User({ name: 'Serj', postCount: 0 });
    await serj.save();
  });

  it('instance set() and save()', async () => {
    // serj.name = 'Daron';
    serj.set('name', 'Daron');
    await serj.save();
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === 'Daron');
  });

  it('instance updateOne()', async () => {
    await serj.updateOne({ name: 'Daron' });
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === 'Daron');
  });

  it('class updateOne()', async () => {
    await User.updateOne({ name: 'Serj' }, { name: 'Daron' });
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === 'Daron');
  });

  it('class findOneAndUpdate()', async () => {
    await User.findOneAndUpdate({ name: 'Serj' }, { name: 'Daron' });
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === 'Daron');
  });

  it('class findByIdAndUpdate()', async () => {
    await User.findByIdAndUpdate(serj.id, { name: 'Daron' });
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === 'Daron');
  });

  it('find user and increment their postCount by 1', async () => {
    await User.findOneAndUpdate({ name: 'Serj' }, { $inc: { postCount: 1 } });
    const user = await User.findOne({ name: 'Serj' });
    assert(user.postCount === 1);
  });
});
