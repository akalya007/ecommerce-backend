// const mongoose = require ('mongoose')

// const productSchema = new mongoose.Schema({
//     id:String,
//     title:String,
//     description:String,
//     price:Number,
//     category:String,
//     imgage:String ,
//     rating:{
//         rate:Number,                              //when having the more object, we 
//         count:Number,
//     }
// })


// const Product = new mongoose.model(' Product',productSchema)          //creating the model

// module.exports=Product;                   //exporting the module


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    cuisines: String,
    cost: Number,
    //category: String,
    image: String,
    rating:Number
    
});

// const Product = mongoose.model('Product', productSchema); // Creating the model

// module.exports = Product; // Exporting the module

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
