import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const GooglePayButton = ({ onPaymentSuccess }) => {
  const stripe = useStripe();

  const handleGooglePay = async () => {
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        token: {
          type: 'google_pay',
        },
      },
    });

    if (paymentMethod) {
      // Send paymentMethod.id to your server
      // Handle server-side payment and response
      onPaymentSuccess(paymentMethod.id);
    } else if (error) {
      // Handle error
    }
  };

  return (
    <button onClick={handleGooglePay}>Pay with Google Pay</button>
  );
};

export default GooglePayButton;
