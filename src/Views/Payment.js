import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm"
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51I2xqcGzyM7sApL2CXUYBTFTgFzGZm5d05J2B0AxN0RGk6i0CyXkFGxnlJXMo2dOOI3ejHZyp3YEzMWOSDr01zDQ00Y27tApui");

export default function Payment(props) {

  const history = useHistory()
  const selectedTime = props.selectedTime
  const { id } = useParams()
  useEffect(() => {
console.log(selectedTime)
    if (selectedTime) {
      //booking mode
      if (selectedTime === "") {
        history.push("/book")
      }
    } else {

      if (
        id !== "threepack" &&
        id !== "fourpack" &&
        id !== "tenpack" &&
        id !== "membership"
      ) {
        history.push("/")
      }
    }
  }, [history])

  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm
          firestore={props.firestore}
          auth={props.auth}
          account={props.account}
          selectedTime={selectedTime} />
      </Elements>
    </div>
  );
}
