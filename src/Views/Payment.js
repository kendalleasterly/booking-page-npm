import { loadStripe } from "@stripe/stripe-js"
import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../Components/CheckoutForm"

import { bookingSelectedDayAtom } from "../Global/atoms"
import { useRecoilState, useRecoilValue } from "recoil"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.

//STRIPE KEY
const promise = loadStripe(
	"pk_live_51I2xqcGzyM7sApL2oRsoS9Oh1HR81hv8vMWeNhhynJMgE117xdWktiQ8RI7uMmryGkWZpkCNHkgfB1BQcRpeMYoM0077N1Unkl"
	// "pk_test_51I2xqcGzyM7sApL2CXUYBTFTgFzGZm5d05J2B0AxN0RGk6i0CyXkFGxnlJXMo2dOOI3ejHZyp3YEzMWOSDr01zDQ00Y27tApui"
)

export default function Payment(props) {
	const history = useHistory()
	const { id, selectedTime } = useParams()
	useEffect(() => {
		if (
			id !== "threepack" &&
			id !== "tenpack" &&
			id !== "fourpack" &&
			id !== "membership"
		) {
			if (selectedTime) {
				const date = new Date()

				date.setTime(selectedTime)
				
			} else {
				history.push("/book")
				console.log("the id wasn't there and there was no time, so i pushed!")
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
				/>
			</Elements>
		</div>
	)
}
