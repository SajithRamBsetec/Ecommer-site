import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentsForm from './Paymentsform';

const stripePromise =loadStripe("pk_test_51NTdrxSC3lUfyefajVCPbPX9qo30hE2kzTZzYF6BYqmsyxTyZC3aOYdpXk9nZ5HJePafFHjZgYGlKjtMA18aMZtW00PVFy10U0")

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentsForm />
    </Elements>
  );
};

export default App;
