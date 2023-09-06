import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import StripeCheckout from "react-stripe-checkout";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, IdealBankElement } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import PaymentsForm from './Paymentsform';

import { BillingAddress } from './CartComponents';
import "./Cart.css"


const stripePromise = loadStripe("pk_test_51NTdrxSC3lUfyefajVCPbPX9qo30hE2kzTZzYF6BYqmsyxTyZC3aOYdpXk9nZ5HJePafFHjZgYGlKjtMA18aMZtW00PVFy10U0")

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [quantityIndicator,setQuantityIndicator]=useState({})
  const [imgId, setImgId] = useState("")
  const [totalAmount, setTotalAmount] = useState(0)
  const [openPayment, setOpenPayment] = useState(0)
  const [productDetail,setProductDetail] = useState([])

  const OrderedProducts=[]
  // Updating products
  const updateCart = () => {
    const user = localStorage.getItem("user_id")
    axios.post("http://localhost:3019/api/addcart", {
      userId: user,
      productId: imgId,
      quantity: quantity,
      mode: "add"
    })
      .then((response) => {
        alert(response.data) // Display the response data
      })
      .catch((err) => {
        alert("Unable to send");
      })
  }

  // Deleting products
  const deleteProduct = (img) => {
    axios.post("http://localhost:3019/api/addcart", {
      userId: user,
      productId: img,
      quantity: quantity,
      mode: "delete"
    })
      .then((response) => {
        alert(response.data) // Display the response data
      })
      .catch((err) => {
        alert("Unable to send");
      })
  }

  // Getting cart items
  useEffect(() => {
    const ans = localStorage.getItem("user_id")
    axios.get("http://localhost:3019/api/ShowCart", { params: { userId: ans ,
    
  } })
      .then((result) => {
        setCartItems(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const ans = localStorage.getItem("user_id")
    axios.get("http://localhost:3019/api/getQuantity", { params: { userId: ans,
    receive:"quantity" } })
      .then((result) => {
        setProductDetail(result.data.CartItems)

        const initialQuantities = {};
      result.data.CartItems.forEach((item) => {
        initialQuantities[item.ProductId] = item.Quantity;
      });
      setQuantityIndicator(initialQuantities);
      })
      .catch((err) => {
        alert(err)
        console.log("Error"+err)
      })
  }, [])

  const amount = () => {
    let totalAmount = 0;
  
    productDetail.forEach((cartItem) => {

cartItems.forEach((product)=>{

  if (product._id==cartItem.ProductId) {
    totalAmount += product.Price * cartItem.Quantity;
  }
})
  
     
    });
 
    return totalAmount;
  };
  
  var ShippingAmount=100;
  var Amount=amount();
  useEffect(() => {
  Amount = amount()

    setTotalAmount(Amount)

  }, [cartItems])



  const user = localStorage.getItem("user_id")

  return (
    <div className='totalCart'>
   <h2 className='CartHeading'>Your Shoping Cart</h2>
      <div>
        <div className='row'>
          <div className='col-5'>
        
          <div className='paymentButt'>
<Elements stripe={stripePromise}>
        {/* {openPayment && totalAmount && <PaymentForm Amount={totalAmount} onClose={() => setOpenPayment(0)} />} */}
        <PaymentsForm Amount={totalAmount} MyOrders={OrderedProducts}/>

      </Elements>
      
      

</div>
          </div>
          <div className='col-7' id="CartProductsList">
     <h3>Order Summary</h3>
     {cartItems.map((product) => {
       return (
        
<div className="cartCover">
<div className='row'>
<div className='col-3'>
             <img src={`http://localhost:3019/${product.Image}`} id="cartProdImgView" />
           </div>
           <div className='col-5'>
           <div className='row-6'>
           {product.Category}
         </div>
         <div className='row-6'>quick View : {product.Description}</div>
         </div>
         <div className='col-4'>
         <div className='row'>
          
           <div className='col'><div className='row-6'> <span style={{marginLeft:"10px"}}>Quantity :</span> {quantityIndicator[product._id]}</div>
            <div className='row-6'> Rs.{product.Price} </div> </div>
           <div>
               <div><button onClick={() => { deleteProduct(product._id) }} >delete</button><button style={{ marginLeft: "10px" }} onClick={updateCart}>update</button> <input type="number" className='shopQuantity' onChange={(e) => {
                 setQuantity(e.target.value)
                 setImgId(product._id)
               }} /></div>
             </div>
           </div>
           
           
         </div>
         </div>
         { OrderedProducts.push({ ProductId:product._id, Category: product.Category, Price: product.Price ,Quantity:quantityIndicator[product._id],TotalPrice:(quantityIndicator[product._id]*product.Price)})}
</div>

       )
   
     })}
<h4>Sub-Total = {Amount}</h4>
<h4>Shipping Amount ={ShippingAmount}</h4>
<hr/>
<h4>Total Amount = {Amount+ShippingAmount}</h4>
          </div>
        </div>
      </div>





    </div>





  )
}

export default Cart