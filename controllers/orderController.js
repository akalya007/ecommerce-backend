const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const { v4: uuidv4 } = require("uuid");
const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.createOrder = async (req, res) => {
  let { email, user_id } = req.user;
  const cart = await Cart.findOne({ user_id });
  console.log(cart.Products);
  const { name, address, PhoneNo } = req.body;
  try {
    if (!cart) {
      return res.status(400).json({ message: "No order exists" });
    } else {
      const order = new Order({
        id: uuidv4(),
        name,
        address,
        PhoneNo,
        email,
        Products: cart.Products,
      });
      await order.save();
      res.status(200).json({ message: "Order successfull" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal error" });
  }
};     


 exports.getorder=async(req,res)=>{
  const userid = req.user.id; 
    const orderDetails = await order.find({ userid });
    const allProducts = [];
    for (const order of orderDetails) {
      for (const product of order.products) {
        const productDetails = await ProductModel.findOne({ id: product.product_id });
        if (productDetails) {
          allProducts.push({
            productid: product.product_id,
            quantity: product.quantity,
            delDate: order.estDate,
            name: productDetails.name, 
            cost: productDetails.cost, 
            image:productDetails.image
          });
        } else {
          console.error("Product not found");
        }
      }
    }
    console.log(orderDetails);
}

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const { user_id } = req.user;

  try {
    const order = await Order.findOneAndDelete({ id: orderId, user_id });

    if (!order) {
      return res.status(404).json({ message: "Order not found or not authorized to delete" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};