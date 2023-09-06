const mongoose = require("mongoose");

const orderCount=new mongoose.Schema({
   Count:Number,
})

const OrderCount=mongoose.model("OrderCount",orderCount)
module.exports=OrderCount