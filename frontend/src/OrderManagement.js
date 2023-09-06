import React,{useState,useEffect}from "react"
import axios from "axios"
import "./Administrator.css";


const OrderManagement=()=>{

const [LiveOrders,setLiveOrders]=useState([])
const [DetailView,setDetailView]=useState(0)
const [OrderId,setOrderId]=useState("")
  useEffect(()=>{


axios.get("http://localhost:3019/api/RetreiveLiveOrders").then((result)=>{
console.log(result)
setLiveOrders(result.data)

})
  },[])
  return(
    <div>
        { DetailView==0 && 
        <div>
        <h3>Order Management</h3><hr/><br/>
        <div className="OrderTableView">
    <table>
  <thead>
    <tr>
      <th>OrderNo</th>
      <th>OrderDate</th>
      <th>Customer Name</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Contact_No</th>
      <th>OrderLocation</th>

   
    </tr>
  </thead>
  <tbody>
  {LiveOrders.map((item)=>{
return(
  <tr>
    <td>{item.OrderNo}</td>
    <td><div className="col" style={{fontSize:"small",fontWeight:"500"}}>
      <div className="row-6">
      {new Date(item.Date).toLocaleDateString()} 
      </div>
      <div className="row-6">
      {new Date(item.Date).toLocaleTimeString()}
      </div>
      </div> </td>
    <td>{item.Name}</td>
    <td>{item.TotalAmount}</td>
    <td>{item.PaymentStatus}</td>
    <td>{item.ContactNo}</td>
    <td>{item.ShippingDetails.City}</td>
    <td><button onClick={()=>{setDetailView(1);setOrderId(item._id);}}>View Details</button></td>
  </tr>
)
   })
  }
  </tbody>
</table>
</div>
</div>
}

{LiveOrders.map((item)=>{
  if(item._id == OrderId && DetailView==1){
  return(
    <div className="OrderDetailView">
      <h3>Order Detail</h3><hr/>
      <div className="row">
        <div className="col-6">
        <label>Order no : </label>
  <content>{item.OrderNo}</content>
        </div>
        <div className="col-6">
  <label>Order Id : </label>
  <content>{item._id}</content>
          </div>
          </div>


          <div className="row">
        <div className="col-6">
        <label>Order Date: </label>
  <content> {new Date(item.Date).toLocaleDateString()} &  {new Date(item.Date).toLocaleTimeString()} </content>
        </div>
        <div className="col-6">
          
  <label>Customer name : </label>
  <content>{item.Name}</content>
          </div>
          </div>


          <div className="row">
        <div className="col-6">
        <label>Total Amount: </label>
  <content>Rs.{item.TotalAmount}</content>
        </div>
        <div className="col-6">
          
  <label>Payment status : </label>
  <content>{item.PaymentStatus}</content>
          </div>
          </div>


          <div className="row">
        <div className="col-6">
        <label>Contact No: </label>
  <content>{item.ContactNo}</content>
        </div>
        <div className="col-6">
          
  <label></label>
  <content></content>
          </div>
          </div><br/>

          <h5>Product Details</h5>
<table>
  <tr>
    <th>Product Id</th>
    <th>Category</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total Price</th>
  </tr>
{item.OrderDetails.map((OrderProducts)=>{
  return(
  <tr>
    <td>{OrderProducts.ProductId}</td>
    <td>{OrderProducts.Category}</td>
    <td>{OrderProducts.Price}</td>
    <td>{OrderProducts.Quantity}</td>
    <td>{OrderProducts.TotalPrice}</td>
  </tr>
  )
})}

</table>

         

<br/><h5>Shipping Details</h5>
<label>Address : </label>
{item.ShippingDetails && item.ShippingDetails.Address && <>{item.ShippingDetails.Address}</>}<br/>
<div className="row">
  <div className="col-6">
    <label>Contact No : </label>
    {item.ShippingDetails && item.ShippingDetails.ContactNo && <>{item.ShippingDetails.ContactNo}</> }<br/>
  </div>
  <div className="col-6">
    <label>City :  </label>
    {item.ShippingDetails && item.ShippingDetails.City && <>{item.ShippingDetails.City}</> }<br/>
  </div>
</div>
<div className="row">
  <div className="col-6">
    <label>State : </label>
    {item.ShippingDetails && item.ShippingDetails.State && <>{item.ShippingDetails.State}</>}<br/>
  </div>
  <div className="col-6">
    <label>Country : </label>
    {item.ShippingDetails && item.ShippingDetails.Country && <>{item.ShippingDetails.Country}</>}<br/>
  </div>
</div>
<div className="row">
  <div className="col-6">
    <label>ZipCode : </label>
    {item.ShippingDetails && item.ShippingDetails.ZipCode && <>{item.ShippingDetails.ZipCode}</> }<br/>
  </div>
  <div className="col-6">
    {/* Additional content here if needed */}
  </div>
</div><br/>


<br/><h5>Billing Details</h5>
<label>Address : </label>
{item.BillingDetails && item.BillingDetails.Address ? <>{item.BillingDetails.Address}</> : null} <br/>
<div className="row">
  <div className="col-6">
    <label>City : </label>
    {item.BillingDetails && item.BillingDetails.City ? <>{item.BillingDetails.City}</> : null}<br/>
  </div>
  <div className="col-6">
    <label>State : </label>
    {item.BillingDetails && item.BillingDetails.State ? <>{item.BillingDetails.State}</> : null}<br/>
  </div>
</div>
<div className="row">
  <div className="col-6">
    <label>Country : </label>
    {item.BillingDetails && item.BillingDetails.Country ? <>{item.BillingDetails.Country}</> : null}<br/>
  </div>
  <div className="col-6">
    <label>ZipCode : </label>
    {item.BillingDetails && item.BillingDetails.ZipCode ? <>{item.BillingDetails.ZipCode}</> : null}<br/>
  </div>
</div><br/>

  <button onClick={()=>setDetailView(0)}>View less</button>
</div>

  )
  }
})}

</div>
  )
}
export default OrderManagement