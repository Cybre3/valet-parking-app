const router = require('express')();
const smsController = require('../controllers/smsController');

router.post('/', smsController.post.sendSMS);

module.exports = router;