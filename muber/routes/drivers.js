const router = require('express').Router();
const driversController = require('../controllers/drivers');

router.get('/', driversController.greetingApp);
router.post('/', driversController.create);

module.exports = router;
