const assert = require('assert');
const User = require('../src/user');

describe('Validate user model', () => {
  beforeEach(async () => {
    const user = new User({ name: 'Serj' });
    await user.save();
  });

  it('name property is required', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    assert(validationResult.errors.name.message === 'Name is required');
  });

  it('name property must be longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    assert(
      validationResult.errors.name.message ===
        'Name must be more than 2 characters long'
    );
  });

  it('should prevent saving invalid user', async () => {
    const user = new User({ name: 'Al' });

    try {
      await user.save();
    } catch (validationResult) {
      assert(
        validationResult.errors.name.message ===
          'Name must be more than 2 characters long'
      );
    }
  });
});
