import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "firebase/auth"
import "firebase/firestore"
import {useCreateEvent } from "../Hooks/FirebaseAdd"
import {usePaymentFunctions } from "../Hooks/PaymentModes"
import BackButton from "./BackButton";
import {useHistory} from "react-router-dom"

export default function CheckoutForm(props) {

  const account = props.account
  const history = useHistory()

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const editDatabase = useCreateEvent(props.firestore, props.auth, account, props.selectedTime)
  const [decidePreviousStep, getProductId] = usePaymentFunctions(props.selectedTime, account)

  

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("https://east-kickboxing-booking.herokuapp.com/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: [{ id: getProductId() }] })
      })
      .then(res => {
        console.log(res)
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      })
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);

      history.pushState("/error")
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      editDatabase(false)

    }
  };
  
//TODO: add a server function that resets the membership people's counts each month

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="card space-y-5">

        <BackButton to = {decidePreviousStep()}/>


        <p className="text-xl font-bold text-center">Enter your payment details</p>

        <CardElement id="card-element" options={cardStyle} onChange={handleChange} className="py-2.5" />

        <button id="submit"
          className="font-semibold rounded-3xl bg-blue-500 text-center text-white w-full py-1.5"
          disabled={processing || disabled || succeeded} >

          <span id="button-text">

            {processing ? (
              <p className="spinner" id="spinner">Loading...</p>
            ) : ("Done")}
          </span>
        </button>

      </div>

      {error && (
        <div className="card-error text-red-400 mx-auto max-w-sm lg:max-w-md text-center mt-7" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}