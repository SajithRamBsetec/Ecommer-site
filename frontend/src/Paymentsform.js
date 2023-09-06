import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, IdealBankElement, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { Accordion,AccordionSummary,AccordionDetails,Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import "./PaymentForm.css"
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const PaymentsForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [cardDetail, setCardDetail] = useState([]);
  const [name,setName]=useState("")
  const [phoneNo,setPhoneNo]=useState()
  const [address,SetAddress]=useState("")
  const [city,setCity]=useState("")
  const [zipCode,setZipCode]=useState()
  const[state,setState]=useState("")
  const [country,setCountry]=useState("")
  const [pay,setPay]=useState(0)
  const [UserId,setUserId]=useState("")
  const [ShippingInfo,setShippingInfo]=useState([])
  const [BillingInfo,setBillingInfo]=useState([])
const [EditBillingAddress,setEditBillingAddress]=useState(0)
const [EditShippingAddress,setEditShippingAddress]=useState(0)
const OrderDate=new Date()


  useEffect(()=>{

    const user = localStorage.getItem("user_id")
    setUserId(user)
axios.get("http://localhost:3019/api/getBillingShippingDetails",{params:{UserID:user}}).then((result)=>{
  if(result.data.ShippingAddress && result.data.BillingAddress){
setShippingInfo(result.data.ShippingAddress)
setBillingInfo(result.data.BillingAddress)
  }
}).catch(err=>console.log("cant find the error "+err))

  },[EditBillingAddress,EditShippingAddress])



useEffect(()=>{
  if(pay){
    fetchClientSecret(props.Amount)
    setPay(0)
  }


 
},[pay])





  const handleSubmit = async (event) => {
    event.preventDefault();
setCardDetail(elements.getElement(CardNumberElement))
    if (!stripe || !elements || !clientSecret||!cardDetail) {
      var Orders=props.MyOrders
      let date=new Date()
            await Orders.map((item)=>{
                item.Date=date
              })
      axios.post("http://localhost:3019/api/SaveLiveOrders",{ShippingDetails:ShippingInfo,BillingDetails:BillingInfo,Orders:Orders,Payment:"Incomplete"})
        .then(()=>{alert("Error in Live Orders")})
        .catch(err=>console.log("err in history saving"+err))
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardDetail,
        },
      });

      if (error) {
        console.error(error.message);

        var Orders=props.MyOrders
        let date=new Date()
              await Orders.map((item)=>{
                  item.Date=date
                })
        axios.post("http://localhost:3019/api/SaveLiveOrders",{ShippingDetails:ShippingInfo,BillingDetails:BillingInfo,Orders:Orders,Payment:"Incomplete"})
        .then(()=>{alert("Error in Live Orders")})
        .catch(err=>console.log("err in history saving"+err))
        
      } 
      else {
        console.log('Payment succeeded:', paymentIntent);

        var Orders=props.MyOrders
        let date=new Date()
              await Orders.map((item)=>{
                  item.Date=date
                })
        
        axios.post("http://localhost:3019/api/StoreOrderHistory",{UserId:UserId,ShippingDetails:ShippingInfo,BillingDetails:BillingInfo,Orders:Orders})
      .then(()=>{alert("history saved")})
      .catch(err=>console.log("err in history saving"+err))
      axios.post("http://localhost:3019/api/SaveLiveOrders",{ShippingDetails:ShippingInfo,BillingDetails:BillingInfo,Orders:Orders,Payment:"Completed"})
      .then(()=>{alert("history saved")})
      .catch(err=>console.log("err in history saving"+err))
      }

      
    } catch (error) {
      console.error('Error confirming card payment:', error);
      var Orders=props.MyOrders
      let date=new Date()
            await Orders.map((item)=>{
                item.Date=date
              })
      axios.post("http://localhost:3019/api/SaveLiveOrders",{ShippingDetails:ShippingInfo,BillingDetails:BillingInfo,Orders:Orders,Payment:"Incomplete"})
      .then(()=>{alert("Error in Live Orders")})
      .catch(err=>console.log("err in history saving"+err))
    }
  };
  const fetchClientSecret = async (a) => {
    try {
      const response = await axios.post("http://localhost:3019/api/Payment", {
        price: a,
        Token: {
          paymentMethodType: "card",
          currency: "inr",
        },
        
      });

      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

 const handleBillingAddress=(e)=>{
e.preventDefault()
axios.post("http://localhost:3019/api/BillingAddress",{ 
  Address:address,
  City:city,
  Zipcode:zipCode,
   State:state,
   Country:country,
   Save:"BillingAddress",
   UserId:UserId
  }).then((result)=>{
  alert("sucess")}).catch((err)=>{console.log("error in Billing Address"+err)})
 }
 const handleShippingAddress=(e)=>{
  e.preventDefault()
  axios.post("http://localhost:3019/api/ShippingAddress",{ 
  Name:name,
  ContactNo:phoneNo,
  Address:address,
  City:city,
  Zipcode:zipCode,
   State:state,
   Country:country,
   Save:"ShippingAddress",
   UserId:UserId
  })
  .then((result)=>{
    alert("sucess")}).catch((err)=>{console.log("error in Billing Address"+err)})
   }
 

  return (
    <div >
    {console.log(ShippingInfo)}
                <Accordion className='OtherCartinfoBar'>
              <AccordionSummary className='AccordionHeadings'  >
                <Typography >
                BillingAddress 
                <span className='PaymentAddEditIcon' onClick={()=>{setEditBillingAddress(1)}} >EDIT <FontAwesomeIcon icon={faEdit}/></span>                
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>

                {(EditBillingAddress==1||BillingInfo==[])?(<form onSubmit={(e)=>{handleBillingAddress(e)}}>
        <label>Address</label><br/>
        <textarea className='BillAdd' onChange={(e)=>{SetAddress(e.target.value)}}/><br/>
        <div className='row'>
          <div className='col-6'>
          <label>City</label><br/>
        <input type="text" name="" onChange={(e)=>{setCity(e.target.value)}}/><br/>
          </div>
          <div className='col-6'>
          <label>Zipcode</label><br/>
        <input type="number" onChange={(e)=>{setZipCode(e.target.value)}}/><br/>
            </div>
        </div>
        <div className='row'>
          <div className='col-6'>
          <label>State</label><br/>
        <input type="text" onChange={(e)=>{setState(e.target.value)}}/><br/>
          </div>
          <div className='col-6'>
             
        <label>Country</label><br/>
        <input type="text" onChange={(e)=>{setCountry(e.target.value)}} /><br/>
            </div>
        </div>
        <div className='row'>
          <div className='col-6'>
          <button type="submit" className='AccordionSaveButton'>Save</button>
          </div>
          <div className='col-6'>
          <button onClick={()=>setEditBillingAddress(0)} className='AccordionSaveButton'>Cancel</button>
            </div>
        </div>


    </form>):(
          <form>
            
              <div >
                <label>Address</label>
                <br />
                <textarea className='BillAdd' value={BillingInfo.Address} readOnly />
                <br />
                <div className='row'>
                  <div className='col-6'>
                    <label>City</label>
                    <br />
                    <input type="text" value={BillingInfo.City} readOnly />
                    <br />
                  </div>
                  <div className='col-6'>
                    <label>Zipcode</label>
                    <br />
                    <input type="number" value={BillingInfo.ZipCode} readOnly/>
                    <br />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <label>State</label>
                    <br />
                    <input type="text" value={BillingInfo.State} readOnly />
                    <br />
                  </div>
                  <div className='col-6'>
                    <label>Country</label>
                    <br />
                    <input type="text" value={BillingInfo.Country} readOnly />
                    <br />
                  </div>
                </div>
  
              </div>
           
          </form>
        )}
        </Typography>-
      </AccordionDetails>
    </Accordion>
  



            <Accordion className='OtherCartinfoBar'>
              <AccordionSummary className='AccordionHeadings'  >
                <Typography >
                Shipping Address
                <span className='PaymentAddEditIconship' onClick={()=>{setEditShippingAddress(1)}} >EDIT <FontAwesomeIcon icon={faEdit}/></span>                
               
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                {(EditShippingAddress==1||ShippingInfo==[])?(<form onSubmit={(e)=>{handleShippingAddress(e)}}>
        <div className='row'>
          <div className='col-6'>
          <label>Full name</label><br/>
        <input type="text" onChange={(e)=>{setName(e.target.value)}}/><br/>
          </div>
          <div className='col-6'>
          <label>Phone number</label><br/>
        <input type="number" onChange={(e)=>{setPhoneNo(e.target.value)}} /><br/>
            </div>
        </div>
        <label>Address</label><br/>
        <textarea className='BillAdd' onChange={(e)=>{SetAddress(e.target.value)}} /><br/>
        <div className='row'>
          <div className='col-6'>
          <label>City</label><br/>
        <input type="text" onChange={(e)=>{setCity(e.target.value)}} /><br/>
          </div>
          <div className='col-6'>
          <label>Zipcode</label><br/>
        <input type="number" onChange={(e)=>{setZipCode(e.target.value)}}/><br/>
            </div>
        </div>
        <div className='row'>
          <div className='col-6'>
          <label>State</label><br/>
        <input type="text" onChange={(e)=>{setState(e.target.value)}}/><br/>
          </div>
          <div className='col-6'>
             
        <label>Country</label><br/>
        <input type="text" onChange={(e)=>{setCountry(e.target.value)}}/><br/>
            </div>
            
        </div>
        <div className='row'>
          <div className='col-6'>
          <button type="submit" className='AccordionSaveButton'>Save</button>
          </div>
          <div className='col-6'>
          <button onClick={()=>setEditShippingAddress(0)} className='AccordionSaveButton'>Cancel</button>
            </div>
        </div>
      </form>):(
        <form>
        <div className='row'>
          <div className='col-6'>
          <label>Full name</label><br/>
        <input type="text" value={ShippingInfo.Name} readOnly/><br/>
          </div>
          <div className='col-6'>
          <label>Phone number</label><br/>
        <input type="number"  value={ShippingInfo.ContactNo} readOnly/><br/>
            </div>
        </div>
        <label>Address</label><br/>
        <textarea className='BillAdd'  value={ShippingInfo.Address} readOnly /><br/>
        <div className='row'>
          <div className='col-6'>
          <label>City</label><br/>
        <input type="text"  value={ShippingInfo.City} readOnly/><br/>
          </div>
          <div className='col-6'>
          <label>Zipcode</label><br/>
        <input type="number"  value={ShippingInfo.ZipCode}readOnly/><br/>
            </div>
        </div>
        <div className='row'>
          <div className='col-6'>
          <label>State</label><br/>
        <input type="text"  value={ShippingInfo.State}readOnly/><br/>
          </div>
          <div className='col-6'>
             
        <label>Country</label><br/>
        <input type="text"  value={ShippingInfo.Country}readOnly/><br/>
            </div>
            
        </div>
        <button type="submit" className='AccordionSaveButton'>Save</button>
      </form>)
}
      
                </Typography>
              </AccordionDetails>
            </Accordion>


            <Accordion className='OtherCartinfoBar'>
              <AccordionSummary className='AccordionHeadings'  >
                <Typography >
                Payment
                </Typography>
              </AccordionSummary>
              <AccordionDetails className='PaymentElement'>
                <Typography>
              <form onSubmit={(e) => { handleSubmit(e); }} >
        <div>
        <input type="text" placeholder='Promo code if any' className='PromoCode'/>
        <CardNumberElement className='CardNumber'/>
        <div className='row'>
            <div className='col-6'>
            <CardCvcElement className='CardCvc'/>
            </div>
            <div className='col-6'>
            <CardExpiryElement className='CardExpiry'/>
            </div>
        </div>
<input type="text" placeholder='Security code' className='PromoCode' />
  

<button type="submit" className='payButt' onClick={()=>setPay(1)} >
          Pay
        </button>

        </div>

   
      </form>
               
                </Typography>
              </AccordionDetails>
            </Accordion>
 
      <div className='OtherCartinfoBar'>
            Review & Placeholder
           </div>
    </div>
  );
};


export default PaymentsForm;
