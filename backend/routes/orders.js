const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

router.get('', OrderController.index);
router.post('/place', OrderController.placeOrder);
router.post('/verify', OrderController.verifyOrder);
router.post('/userorders', OrderController.userOrders);
router.post('/status', OrderController.updateStatus);


module.exports = router;