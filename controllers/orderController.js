// const Order = require("../models/orderModel");
// const Cart = require("../models/cartModel");
// const { v4: uuidv4 } = require("uuid");
// const Product = require('../models/productModel');
// const User = require('../models/userModel');



// exports.createorder = async (req, res) => {
//   const { cust_name, cust_phno, cust_address } = req.body;
//   try {
//     const { userId, user_email } = req.user;

//     const userCart = await Cart.findOne({ userId });
//     console.log(userCart);
//     if (!userCart) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const productDetails = [];

//     for (const item of userCart.products) {
//       const product = await Product.findOne({ id: item.product_id }); // Corrected variable name
//       if (product) {
//         productDetails.push({
//           product_id: item.product_id,
//           quantity: item.quantity
//         });
//       }
//     }

//     const newOrder = new Order({
//       id: uuidv4(),
//       user_id: userId, // Store user_id correctly
//       user_email, 
//       cust_name, 
//       cust_phno,
//       cust_address,
//       products: productDetails,
//       orderDate: new Date(), // order date
//       estDate: new Date(Date.now() + 7*24*60*60*1000) // Estimated delivery date (1 week later)
//     });
    

//     const savedOrder = await newOrder.save();
//     await userCart.deleteOne({ userId });

//     return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error", error: err.message });
//   }
// };




// exports.getorder = async (req, res) => {
//   try {
//     const userid = req.user.id; 
//     const orderDetails = await Order.find({ user_id: userid }); // Check for correct variable names

//     if (!orderDetails || orderDetails.length === 0) {
//       return res.status(404).json({ message: "No orders found for this user." });
//     }

//     const allProducts = [];
//     for (const order of orderDetails) {
//       if (!order.Products || !Array.isArray(order.Products)) {
//         continue; // Skip this order if Products field is not an array
//       }

//       for (const product of order.Products) {
//         const productDetails = await Product.findOne({ id: product.product_id });
//         console.log( "product", productDetails);
//         if (productDetails) {
//           allProducts.push({
//             productid: product.product_id,
//             quantity: product.quantity,
//             delDate: order.Del_Date, // Use correct field for delivery date
//             name: productDetails.name,
//             cost: productDetails.cost,
//             image: productDetails.image
//           });
//         } else {
//           console.error("Product not found");
//         }
//       }
//     }

//     console.log(orderDetails);
//     res.status(200).json(allProducts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// exports.deleteOrder = async (req, res) => {
//   const { orderId } = req.params;
//   const { user_id } = req.user;

//   try {
//     const order = await Order.findOneAndDelete({ id: orderId, user_id });

//     if (!order) {
//       return res.status(404).json({ message: "Order not found or not authorized to delete" });
//     }

//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// =======arthi



const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

const manageOrder = async (req, res) => {
    const { cust_name, cust_phno, cust_address } = req.body;
    try {
        const {  user_id, user_email } = req.user;
        console.log("email",user_email);
        console.log("user_id",user_id);


        const userCart = await Cart.findOne({  user_id: user_id });
        console.log("usercart:", user_id)
        if (!userCart) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const productDetails = [];

        for (const item of userCart.products) {
            const product = await ProductModel.findOne({ id: item.product_id });
            if (product) {
                productDetails.push({
                    product_id: item.product_id,
                    quantity: item.quantity
                });
            }
        }

        const newOrder = new Order({
            id: uuidv4(),
            user_id, // Use user_id from req.user
            user_email, 
            cust_name, 
            cust_phno,
            cust_address,
            products: productDetails,
            orderDate: new Date(), // order date
            estDate: new Date(Date.now() + 7*24*60*60*1000) // Estimated delivery date (1 week later)
        });

        const savedOrder = await newOrder.save();
        await userCart.deleteOne({ userId: user_id });

        return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


const getOrders = async (req, res) => {
    const userId = req.user.id; 
    try {
        const orderDetails = await Order.find({ userId });
        const allProducts = [];

        for (const order of orderDetails) {
            for (const product of order.products) {
                const productDetails = await ProductModel.findOne({ id: product.product_id });
                if (productDetails) {
                    allProducts.push({
                        productId: product.product_id,
                        quantity: product.quantity,
                        delDate: order.estDate,
                        name: productDetails.name, 
                        cost: productDetails.cost, 
                        image: productDetails.image
                    });
                } else {
                    console.error("Product not found", product.product_id);
                }
            }
        }

        return res.status(200).json({ orders: orderDetails, products: allProducts });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

module.exports = { manageOrder, getOrders };