const Driver = require('../models/driver');

module.exports = {
  greetingApp(req, res) {
    res.status(200).json({ hi: 'there' });
  },

  async create(req, res) {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(200).json({ status: 'success', data: { driver } });
  }
};
