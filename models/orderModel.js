const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: String,
  user_id: String, // Add this line to link orders to users
  name: String,
  address: String,
  PhoneNo: Number,
  email: String,
  Products: [
    {
      product_id: String,
      quantity: Number,
    },
  ],
  OrderDate: {
    type: Date,
    default: Date.now,
  },
  Del_Date: {
    type: Date,
    default: () =>
      Date.now() + Math.floor(Math.random() * 11) * 24 * 60 * 60 * 1000,
  },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;