import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51I68DAF7CJHF9XyiIrrANxfLPdD7jJcTuFpdVnOzVeS5ePbc0NRaXQPCT40A0sYiCYzUula7PlyyXhcAGb24Pp2400HHOo54rE');

function Payment(props) {
  const history = useHistory()
  const model = props.model
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('/create-checkout-session', { method: 'POST' });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };


  if (model.selectedTime === "") {

    history.push("/")
  } 

    return (
      <div>
        <button onClick={handleClick}>payment</button>

      </div>
    )
}

export default Payment
