const router = require('express')();
const smsController = require('../controllers/smsController');

router.post('/', smsController.post.sendSMS);
router.post('/receive', smsController.post.receiveCarRequestSMS);
router.post('/carInTransit', smsController.post.sendCarInTransitSMS);

module.exports = router;