import React from 'react'
import { CheckoutSteps,Header,Payment } from '../../components'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const PaymentPage = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: import.meta.env.VITE_STRIPE_SECRET_KEY,
  };
  return (
    <Elements stripe={stripePromise}>
    <div className='w-full h-screen'>
    <div className='w-full h-[20%]'>
    <Header/>
    </div>
 <div className='w-full'>
<br/>
<br />
<CheckoutSteps active={2}/>
<Payment/>
</div>
  </div>
    </Elements>
  )
}

export default PaymentPage