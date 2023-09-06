const mongoose=require("mongoose")
const OrderSchema=mongoose.Schema({
    Name:String,
    ContactNo:Number,
    Order_id:String,
    OrderNo:Number,
    Date:Date,
    TotalAmount:Number,
    PaymentStatus:String,
    ShippingDetails:{
            Name:String,
            ContactNo:Number,
            Address:String,
            City:String,
            ZipCode:Number,
            State:String,
            Country:String
        },
         BillingDetails:{
            Address:String,
            City:String,
            ZipCode:Number,
            State:String,
            Country:String
        },
    OrderDetails:[{
        ProductId:String,
        Category:String,
        Price:Number,
        Quantity:Number,
        TotalPrice:Number,
      
    }]
})
const Order=mongoose.model("LiveOrders",OrderSchema)
module.exports=Order;