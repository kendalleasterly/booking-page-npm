import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {useCreateEvent } from "../Hooks/FirebaseAdd"
import {usePaymentFunctions } from "../Hooks/PaymentModes"
import BackButton from "./BackButton";
import {useHistory, useParams} from "react-router-dom"

export default function CheckoutForm(props) {

  const account = props.account
  const history = useHistory()
  const { id, selectedTime } = useParams()

  let selectedTimeDate

  if (selectedTime) {
    selectedTimeDate= new Date()
    selectedTimeDate.setTime(selectedTime)
  }

  const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const editDatabase = useCreateEvent(account, selectedTimeDate)

console.log("the checkout forms selected time is ", selectedTimeDate)

  const [decidePreviousStep, getProductId] = usePaymentFunctions(selectedTimeDate, account)

  const serverURL = "https://east-kickboxing-club.herokuapp.com/create-payment-intent"
  // const serverURL = "http://localhost:4000/create-payment-intent"

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch(serverURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: [{ id: getProductId() }] })
      })
      .then(res => {
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
      setError(`Payment failed: ${payload.error.message} Please contact support@eastkickboxingclub.com for assistance.`);
      setProcessing(false);

    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      editDatabase(false)

    }
  };

  function getProductInformation() {

    if (selectedTimeDate) {
      //give the info for the booking 

      const month = months[selectedTimeDate.getMonth()]
      const day = selectedTimeDate.getDate()

      console.log("our stuff is", day, month)

      return [`Class on ${month} ${day}`, "15"]
      
    } else {

      switch (id) {

        case "threepack":
          return ["Three Pack", "40"]
        case "fourpack":
          return ["Four Pack", "50"]
        case "tenpack":
          return ["Ten Pack", "130"]
        case "membership":
          return ["Membership", "180"]
        default:
          return ["Loading...", ""]
      }
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="card space-y-5">

        <BackButton to = {decidePreviousStep()}/>


        <p className="text-xl font-bold text-center">Enter your payment details</p>

        <div className="font-bold text-left text-gray-900 space-y-4">

								<div>
									<p className="text-lg text-gray-400">Item</p>
									<p>{getProductInformation()[0]}</p>
								</div>

                <div>
									<p className="text-lg text-gray-400">Price</p>
									<p>${getProductInformation()[1]}</p>
								</div>

                </div>
        

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



