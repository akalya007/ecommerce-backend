// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   id: String,
//   user_id: String, // Ensure this is correctly named and matches your code
//   cust_name: String,
//   cust_address: String,
//   cust_phno: Number,
//   user_email: String,
//   products: [
//     {
//       product_id: String,
//       quantity: Number,
//     },
//   ],
//   orderDate: {
//     type: Date,
//     default: Date.now,
//   },
//   estDate: {
//     type: Date,
//     default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
//   },
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;




// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   id: String,
//   user_id: String, // Ensure consistency with controller
//   cust_name: String, // Use `cust_name` instead of `name`
//   cust_address: String, // Use `cust_address` instead of `address`
//   cust_phno: Number, // Use `cust_phno` instead of `PhoneNo`
//   user_email: String, // Use `user_email` instead of `email`
//   products: [
//     {
//       product_id: String,
//       quantity: Number,
//     },
//   ],
//   orderDate: {
//     type: Date,
//     default: Date.now,
//   },
//   estDate: {
//     type: Date,
//     default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   },
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;


//ar


const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user_id:{
        type:String,
        require:true,

    },
    id:{
        type:String,
        require:true,
    },
    
    user_email:{
        type:String,
        required:true
    },
    cust_name:{
        type:String,
        required:true
    },
    cust_phno:{
        type:Number,
        required:true
    },
    cust_address:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now,
        
    },
    estDate:{
        type:Date,
        
    },
    tot_Amount:{
        type:Number,

    },
    orderStatus:{
        type:String,

    },
    products:[{
        product_id:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }]


});
const orderModel = mongoose.model('order',orderSchema);
module.exports=orderModel;