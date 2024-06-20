const express = require('express');
const CartController = require('../controllers/CartController');

const router = express.Router();

router.post('/add', CartController.addToCart);

router.post('/remove', CartController.removeFromCart);

router.post('/get', CartController.getCart);


module.exports = router;