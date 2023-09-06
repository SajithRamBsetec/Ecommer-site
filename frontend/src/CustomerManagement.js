import React,{useState,useEffect} from "react"
import axios from "axios"
import "./Administrator.css";

const CustomerManagement=()=>{

    const [OrderDetails,setOrderDetails]=useState([])
    const [DetailView,setDetailView]=useState(0)
    const [ViewId,setViewId]=useState("")
  useEffect(()=>{
axios.get("http://localhost:3019/api/getOrderHistory").then((result)=>{console.log(result)
setOrderDetails(result.data)
})
  },[])

  return(
    <div>
       <h3>Customer Management</h3><hr/><br/>
      <div className="row">
        <div className="col-6 TableSection">
      <table className="table">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DateOfBirth</th>
            
          </tr>
    
        {OrderDetails.map((item)=>{
          return(
         <tr>
          <td>{item.Name}</td>
          <td>{item.Email}</td>
          <td>{item.DateOfBirth}</td>
         <td> <button onClick={()=>{setDetailView(1)
        setViewId(item._id)}} className="CustomerDetailViewButton">View Details</button></td>
         </tr>
         
          )
        })
        }
       
    </table>
        </div>
        <div className="col-6 DetailSection">
        {OrderDetails.map((item)=>{
          if(item._id==ViewId && DetailView==1){
          return(
       <>
       <div className="row">
        <div className="col-6">
        <label>Name : </label>
          <>{item.Name}</><br/>
        </div>
        <div className="col-6">
        <label>Email : </label>
          <>{item.Email}</><br/>
        </div>
       </div>
       <div className="row">
        <div className="col-6">
        <label>Contact No : </label>
          {item.ShippingAddress && item.ShippingAddress.ContactNo && <>{item.ShippingAddress.ContactNo}</>}
        </div>
        <div className="col-6">
        <label>Date Of Birth : </label>
          <>{item.DateOfBirth}</><br/>
        </div>
       </div><br/>

<h5>Billing Details</h5>
<label>Address : </label>
{item.BillingAddress && item.BillingAddress.Address ? <>{item.BillingAddress.Address}</> : null} <br/>
<div className="row">
  <div className="col-6">
    <label>City : </label>
    {item.BillingAddress && item.BillingAddress.City ? <>{item.BillingAddress.City}</> : null}<br/>
  </div>
  <div className="col-6">
    <label>State : </label>
    {item.BillingAddress && item.BillingAddress.State ? <>{item.BillingAddress.State}</> : null}<br/>
  </div>
</div>
<div className="row">
  <div className="col-6">
    <label>Country : </label>
    {item.BillingAddress && item.BillingAddress.Country ? <>{item.BillingAddress.Country}</> : null}<br/>
  </div>
  <div className="col-6">
    <label>ZipCode : </label>
    {item.BillingAddress && item.BillingAddress.ZipCode ? <>{item.BillingAddress.ZipCode}</> : null}<br/>
  </div>
</div><br/>




<h5>Shipping Details</h5>
<label>Address : </label>
{item.ShippingAddress && item.ShippingAddress.Address && <>{item.ShippingAddress.Address}</>}<br/>
<div className="row">
  <div className="col-6">
    <label>Contact No : </label>
    {item.ShippingAddress && item.ShippingAddress.ContactNo && <>{item.ShippingAddress.ContactNo}</> }<br/>
  </div>
  <div className="col-6">
    <label>City :  </label>
    {item.ShippingAddress && item.ShippingAddress.City && <>{item.ShippingAddress.City}</> }<br/>
  </div>
</div>
<div className="row">
  <div className="col-6">
    <label>State : </label>
    {item.ShippingAddress && item.ShippingAddress.State && <>{item.ShippingAddress.State}</>}<br/>
  </div>
  <div className="col-6">
    <label>Country : </label>
    {item.ShippingAddress && item.ShippingAddress.Country && <>{item.ShippingAddress.Country}</>}<br/>
  </div>
</div>
<div className="row">
  <div className="col-6">
    <label>ZipCode : </label>
    {item.ShippingAddress && item.ShippingAddress.ZipCode && <>{item.ShippingAddress.ZipCode}</> }<br/>
  </div>
  <div className="col-6">
    {/* Additional content here if needed */}
  </div>
</div><br/>


       <h5>Order History</h5>
       <div className="CustomerOrderView">
       <table >
        <tr>
          <th>Order No</th>
          <th>Date</th>
          <th>ProductID</th>
          <th>Category</th>
          <th>Price</th>
          <th>QTY</th>
          <th>Total Price</th>

        </tr>
    {item.OrderHistory ? (item.OrderHistory.map((History)=>{
return(
  <tr>
  <td>{History.OrderId}</td>
  <td>{new Date(History.Date).toLocaleDateString()}</td>
<td>{History.ProductId}</td>
  <td>{History.Category}</td>
  <td>{History.Price}</td>
  <td>{History.Quantity}</td>
  <td>{History.TotalPrice}</td>
 
  
  </tr>

)
})
   ):(
    <h5> No orders placed yet</h5>
   )}

   </table>  
   </div>
          <button onClick={()=>{setDetailView(0)}} className="CustomerLessViewButton">View Less</button>
         </>
         
          )
          }
        })
        }
       
        </div>
        </div>
     
    
    </div>
  )
}
export default CustomerManagement