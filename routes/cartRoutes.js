// const express = require('express');
// const CartController = require("../controllers/cartController");
// const router = express.Router();
// const auth = require("../middleware/auth");

// router.get("/", auth, CartController.getcarts);
// router.post("/createCart", auth, CartController.createCart);

// module.exports = router;


const express = require('express');
const CartController = require("../controllers/cartController");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/getcart", auth, CartController.getcarts);
router.post("/createcart", auth, CartController.createCart);
router.delete("/deletecart/:id", auth, CartController.deleteCart); 
module.exports = router;


