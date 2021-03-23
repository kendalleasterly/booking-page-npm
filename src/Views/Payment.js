import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

import { bookingSelectedDayAtom } from "../Global/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.

//STRIPE KEY
const promise = loadStripe(
  "pk_test_51I2xqcGzyM7sApL2CXUYBTFTgFzGZm5d05J2B0AxN0RGk6i0CyXkFGxnlJXMo2dOOI3ejHZyp3YEzMWOSDr01zDQ00Y27tApui"
);

export default function Payment(props) {
  const history = useHistory();
  const selectedTime = useRecoilValue(bookingSelectedDayAtom);
  const { id } = useParams();
  useEffect(() => {
    if (
      id !== "threepack" &&
      id !== "tenpack" &&
      id !== "fourpack" &&
      id !== "membership"
    ) {
      if (selectedTime === "") {
        console.log("had to push back since there was no selected time");

        history.push("/book");
      }
    }
  }, [history]);

  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm
          firestore={props.firestore}
          auth={props.auth}
          account={props.account}
          selectedTime={selectedTime}
        />
      </Elements>
    </div>
  );
}
