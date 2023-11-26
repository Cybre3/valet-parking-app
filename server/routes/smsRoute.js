const router = require('express')();
const smsController = require('../controllers/smsController');

router.post('/', smsController.post.sendSMS);
router.post('/receive', smsController.post.receiveSMS);

module.exports = router;