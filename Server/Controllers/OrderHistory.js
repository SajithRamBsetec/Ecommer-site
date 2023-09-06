const Register = require("../Models/RegisterModel");
const OrderCount=require("../Models/Ordercount")
const {v4: uuidv4} = require("uuid");


exports.StoreOrderHistory = async (req, res) => {
  try {
    const uid = uuidv4();

    await OrderCount.updateOne(
      { Count: { $exists: false } }, 
      { $set: { Count: 0 } },
      { upsert: true }
    );
    
  
    const { UserId, Orders, ShippingDetails, BillingDetails } = req.body;
    const options = {
      upsert: true,
      new: true,
    };
    var responseCount = await OrderCount.find()
 
    var count=responseCount[0].Count
    for (const item of Orders) {
       
      
        await OrderCount.updateOne({},{$inc:{Count:1}},{returnOriginal:false})



      
      const result = await Register.updateOne(
        { _id: UserId},
        {
          $push: {
            OrderHistory: {
                OrderId:uid,
              Date: item.Date,
              ProductId: item.ProductId,
              Category: item.Category,
              Price: item.Price,
              Quantity: item.Quantity,
              TotalPrice: item.TotalPrice,
              ShippingDetails:{
                Name:ShippingDetails.Name,
                ContactNo:ShippingDetails.ContactNo,
                Address:ShippingDetails.Address,
                City:ShippingDetails.City,
                ZipCode:ShippingDetails.ZipCode,
                State:ShippingDetails.State,
                Country:ShippingDetails.Country,
              },
              BillingDetails:{
                Address:BillingDetails.Address,
                City:BillingDetails.City,
                ZipCode:BillingDetails.ZipCode,
                State:BillingDetails.State,
                Country:BillingDetails.Country,
              },
            },
          },
        },
        options
      );

    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderList=(req,res)=>{
Register.find().then((result)=>{
  res.json(result)
})
  
}
exports.getCount=(req,res)=>{
  OrderCount.find().then((responseCount)=>{
  res.json(responseCount)
  }
  )
}
