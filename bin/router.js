var router = require('express').Router();
var OtpCtrl = require('./mock/OtpCtrl');

// Only 'GET' request.
router.get('/otp', OtpCtrl.index);

// Capture 'GET', 'POST', 'DELETE', 'PUT'
router.use('/otp/list', OtpCtrl.list);

// Only for 'POST' request.
router.post('/otp/sendOtp', OtpCtrl.sendOtp);


module.exports = router;
