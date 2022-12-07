const express = require('express');
const router = express.Router();
const { makePayment, setPaymentStatus } = require('../controllers/paytmController');

router.route('/payment').post(makePayment);
router.route('/payment/status').post(setPaymentStatus);

module.exports = router;