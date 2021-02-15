import firebase from "firebase/app"
import {auth, firestore} from "../Global/firebase"
import { useHistory, useParams } from "react-router-dom"

export function useCreateEvent(account, selectedTime) {

    const history = useHistory()
    const { id } = useParams()

    if (selectedTime) {

        function callback(willUseFreeClasses) {

            const bookingsRef = firestore.collection("bookings")
            const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
            const classRef = firestore.collection("classes").doc(selectedTime)

            if (firestore && auth && account && selectedTime && account.freeClasses >= 0) {
                bookingsRef.add({
                    time: selectedTime,
                    userID: auth.currentUser.uid
                })

                if (willUseFreeClasses && !account.isMember) {
                    accountRef.update({
                        freeClasses: firebase.firestore.FieldValue.increment(-1)
                    })
                }

                classRef.update({
                    attendees: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                })

                history.push("/book/success")

            } else {
                console.log("error in get db add")
                history.push("/error")
            }
        }

        return callback

    } else {

        function callback() {

            const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
            let incrementValue = 0

            switch (id) {
                case "threepack":
                    incrementValue = 3
                    break

                case "fourpack":
                    incrementValue = 4
                    break

                case "tenpack":
                    incrementValue = 10
                    break

                default:
                    break;
            }



            if (firestore && account) {


                accountRef.update({
                    freeClasses: firebase.firestore.FieldValue.increment(incrementValue)
                })

                if (id === "membership") {
                    accountRef.update({
                        isMember: true
                    })
                }

                console.log("finished function" + incrementValue)
                history.push("/products/success")

            }
        }

        return callback

    }


}