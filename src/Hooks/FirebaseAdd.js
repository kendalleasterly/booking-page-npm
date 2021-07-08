import firebase from "firebase/app"
import {auth, fb, firestore} from "../Global/firebase"
import { useHistory, useParams } from "react-router-dom"

export function useCreateEvent(account, selectedTime) {

    const history = useHistory()
    const { id } = useParams()

    console.log("the time that was given to firebase add was", selectedTime)

    if (selectedTime) {

        function callback(willUseFreeClasses) {

            const bookingsRef = firestore.collection("bookings")
            const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
            const classRef = firestore.collection("classes").where("date", "==", fb.firestore.Timestamp.fromDate(selectedTime))

            console.log("the classref is", classRef, "since the date is", selectedTime)

            if (firestore && auth && account && selectedTime && account.freeClasses >= 0) {
                bookingsRef.add({
                    time: fb.firestore.Timestamp.fromDate(selectedTime),
                    userID: auth.currentUser.uid
                })

                if (willUseFreeClasses && !account.isMember) {
                    accountRef.update({
                        freeClasses: firebase.firestore.FieldValue.increment(-1)
                    })
                }

                classRef.get().then(snapshot => {

                    console.log("the snapshoit we found was", snapshot.docs[0].id)

                    const simplifiedUserObject = {
                        id: auth.currentUser.uid,
                        name: account.name,
                        email: account.email
                    }

                    snapshot.docs[0].ref.update({
                        attendees: firebase.firestore.FieldValue.arrayUnion(simplifiedUserObject)
                    })
                    
                    history.push(`/book/success/${selectedTime.getTime()}`)

                })

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
                        isMember: true,
                        daysLeft:29
                    })
                }

                console.log("finished function" + incrementValue)
                history.push("/products/success")

            }
        }

        return callback

    }


}