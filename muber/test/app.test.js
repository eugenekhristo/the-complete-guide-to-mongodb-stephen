const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Test app', () => {
  it('should send good object', done => {
    request(app)
      .get('/api/drivers')
      .end((err, res) => {
        assert(res.body.hi === 'there');
        done();
      });
  });
});
