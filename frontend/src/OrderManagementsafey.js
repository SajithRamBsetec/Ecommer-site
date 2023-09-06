import React,{useState,useEffect}from "react"
import axios from "axios"
import "./Administrator.css";

const OrderManagement=()=>{

    const [OrderDetails,setOrderDetails]=useState([])
const [OrderCount,setOrderCount]=useState()
var count=1;
  useEffect(()=>{
axios.get("http://localhost:3019/api/getOrderHistory").then((result)=>{console.log(result)
setOrderDetails(result.data)
})
axios.get("http://localhost:3019/api/getCount").then((result)=>{
setOrderCount(result.data[0].Count)

})
  },[])
  return(
    <div>
          <h1>Product Management</h1><hr/><br/>
    <table>
  <thead>
    <tr>
      <th>OrderID</th>
      <th>CustomerName</th>
      <th>Status</th>
      <th>Amount</th>
      <th>Quantity</th>
      <th>Total Amount</th>
    </tr>
  </thead>
  <tbody>
    {Array.from({ length: OrderCount }).map((_, index) => (
      <React.Fragment key={index}>
        {OrderDetails.map((item) => {
          const orderHistoryItem = item.OrderHistory.find(
            (hisItem) => hisItem.OrderId === index + 1
          );

          if (orderHistoryItem) {
            return (
              <tr key={orderHistoryItem.OrderId}>
                <td>{orderHistoryItem.OrderId}</td>
                <td>{item.Name}</td>
                <td>{"Complete"}</td>
                <td>{orderHistoryItem.Price}</td>
                <td>{orderHistoryItem.Quantity}</td>
                <td>{orderHistoryItem.TotalPrice}</td>
              </tr>
            );
          }

          return null;
        })}
      </React.Fragment>
    ))}
  </tbody>
</table>
</div>
  )
}
export default OrderManagement