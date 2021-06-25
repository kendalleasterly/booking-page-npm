import axios from "axios"
import { firestore, auth } from "../Global/firebase"

// const serverURL = "http://localhost:4000"
const serverURL = "https://east-kickboxing-club.herokuapp.com"

export default function useSubmitCredentials(email, password, errorHandler, name) {

    function signUp() {

        auth.createUserWithEmailAndPassword(email, password)
            .then(async userCredential => {

                const userRef = firestore.collection("users").doc(userCredential.user.uid)

                const newStripeUser = await axios.post(serverURL + "/create-stripe-customer", {
                    name: name,
                    email: email,
                    uid: userCredential.user.uid
                })

                userRef.get()
                    .then((snapshot) => {
                        if (!snapshot.exists) {

                            userRef.set({
                                name: name,
                                email: email,
                                freeClasses: 0,
                                isMember: false,
                                daysLeft: -1,
                                stripeCustomerID: newStripeUser.data.id
                            })
                        }
                    })
                    .catch(err => {
                        errorHandler(err)
                    })
            })
            .catch(err => {
                errorHandler(err.message)
            })
    }

    function logIn() {

        auth.signInWithEmailAndPassword(email, password)
            .catch(err => {

                if (err.message === "The password is invalid or the user does not have a password.") {
                    errorHandler("The password is invalid.")
                } else {
                    errorHandler(err.message)
                }
            })
    }

    if (name) {
        return signUp
    } else {
        return logIn
    }

}