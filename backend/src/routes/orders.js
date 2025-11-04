const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/ordersController');

const router = express.Router();

router.post('/create', createOrder);
router.post('/verify', verifyPayment);

module.exports = router;


