const Order = require("../Models/LiveOrderHistory");
const OrderCount = require("../Models/Ordercount");

const {v4: uuidv4} = require("uuid");

exports.LiveOrderDetailStoring = async (req, res) => {
  const uid = uuidv4();

  const { Orders, ShippingDetails, BillingDetails, Payment } = req.body;
  let Date;
  let totalAmount = 0;
  let OrderDetails = [];
  const responseCount = await OrderCount.find();
  const count = responseCount[0].Count;

  Orders.map((item) => {
    Date = item.Date;
    totalAmount += item.TotalPrice;
    OrderDetails.push({
      ProductId: item.ProductId,
      Category: item.Category,
      Price: item.Price,
      Quantity: item.Quantity,
      TotalPrice: item.TotalPrice,
    });
  });

  const result = await Order.create({
    Name: ShippingDetails.Name,
    ContactNo: ShippingDetails.ContactNo,
    OrderId: uid,
    OrderNo: count,
    Date,
    TotalAmount: totalAmount,
    PaymentStatus: Payment,
    TotalPrice: totalAmount,
    ShippingDetails: {
      Name: ShippingDetails.Name,
      ContactNo: ShippingDetails.ContactNo,
      Address: ShippingDetails.Address,
      City: ShippingDetails.City,
      ZipCode: ShippingDetails.ZipCode,
      State: ShippingDetails.State,
      Country: ShippingDetails.Country,
    },
    BillingDetails: {
      Address: BillingDetails.Address,
      City: BillingDetails.City,
      ZipCode: BillingDetails.ZipCode,
      State: BillingDetails.State,
      Country: BillingDetails.Country,
    },
    OrderDetails,
  });

  console.log(result);
  res.status(200);
};

exports.getLiveOrders=(req,res)=>{
    Order.find().sort({Date:-1}).then((result)=>{
console.log(result)
res.json(result)
    })
}