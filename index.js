
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors =require("cors");


app.use(express.json());
app.use(cors());                           //buildin middleware.

mongoose.connect(
    "mongodb://localhost:27017/e_commerce"
//    "mongodb+srv://akalya:akalya@cluster0.ntdxaml.mongodb.net/e_commerce"
).then(() => {
    console.log("connected to database");
}).catch(err => {
    console.error("Database connection error:", err);
});

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});


