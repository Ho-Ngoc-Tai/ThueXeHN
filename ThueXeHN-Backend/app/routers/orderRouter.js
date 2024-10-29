// orderRouter.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/', orderController.getAllOrders);
router.get('/user/:userId', orderController.getOrdersByUser);
router.put('/update/:id', orderController.updateOrderDescriptionAndStatus);
router.get('/owner/:ownerId', orderController.getOrdersByOwner);

module.exports = router;
