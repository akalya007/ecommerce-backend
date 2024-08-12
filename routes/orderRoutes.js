const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth= require("../middleware/auth");

router.post('/createOrders',auth,orderController.createOrder);
router.get('/getOrders', auth, orderController.getorder);

module.exports = router;