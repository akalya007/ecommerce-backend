// const mongoose = require('mongoose');
// // const Product = require('./productModel')

// const  CartSchema = new mongoose.Schema({
//     user_id: String,
//     Products :[
//         {
//             Product_id: String,
//             quantity:Number,
//         },
//     ],
// });


// const Cart = mongoose.model("cart",CartSchema);
// module.exports = Cart; // Exporting the module



const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: String,
    products: [
        {
            product_id: String,
            quantity: Number,
        },
    ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart; // Exporting the module


