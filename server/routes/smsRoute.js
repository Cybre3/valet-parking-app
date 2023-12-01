const router = require('express')();
const smsController = require('../controllers/smsController');

router.post('/', smsController.post.sendSMS);
router.post('/receive', smsController.post.receiveCarRequestSMS);

module.exports = router;