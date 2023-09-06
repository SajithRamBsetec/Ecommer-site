const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    Category: String,
    Variety:String,
    Brand:String,
    ProductName:String,
    Price: Number,
    Description: String,
    Tags: [String],
    Specifications: [{
        Key:String,
        Value:String,
    }],
    Image:String,
    SpecImages: [String],
    Views:{
        type:Number,
        default:0
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
