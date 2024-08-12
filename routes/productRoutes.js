const express = require('express');
const ProductController = require("../controllers/productController");
const router = express.Router();
const auth= require("../middleware/auth");




router.get("/getproduct", auth,ProductController.getProducts);
router.post("/createproduct",auth, ProductController.createProduct);


module.exports = router;  // Ensure only the router is exported
