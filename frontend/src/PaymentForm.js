import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, IdealBankElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import "./PaymentForm.css"
const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [cardDetail, setCardDetail] = useState([]);
  const [pay,setPay]=useState(0)

useEffect(()=>{
  if(pay){
    fetchClientSecret(props.Amount)
    setPay(0)
  }
},[pay])

  const handleSubmit = async (event) => {
    event.preventDefault();
setCardDetail(elements.getElement(CardElement))
    if (!stripe || !elements || !clientSecret||!cardDetail) {
      return;
    }
    console.log()

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardDetail,
        },
      });

      if (error) {
        console.error(error.message);
      } else {
        console.log('Payment succeeded:', paymentIntent);
      }
    } catch (error) {
      console.error('Error confirming card payment:', error);
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

 

  return (
    <div >
      <form onSubmit={(e) => { handleSubmit(e); }} >
        <label className='paymentLabel'>Card</label>
        <CardElement />
      
<div className='paymentButt'>
<button type="submit" className='payButt' onClick={()=>setPay(1)} >
          Pay
        </button>
        <button onClick={props.onClose} className='closeButt'>Close</button>
</div>
       
      </form>
     
    </div>
  );
};

export default PaymentForm;
