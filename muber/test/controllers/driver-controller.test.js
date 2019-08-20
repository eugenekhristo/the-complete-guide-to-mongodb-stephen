const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const User = mongoose.model('Driver');
const app = require('../../app');

describe('Driver controller', () => {
  it('should create a new driver', done => {
    User.countDocuments().then(countResult => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end((err, res) => {
          User.countDocuments().then(newCountResult => {
            assert(countResult + 1 === newCountResult);
            done();
          });
        });
    });
  });
});
