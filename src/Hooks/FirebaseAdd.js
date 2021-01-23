import firebase from "firebase/app"
import { useHistory, useParams } from "react-router-dom"

export function useCreateEvent(firestore, auth, account, model) {

    const history = useHistory()
    const { id } = useParams()

    if (model) {

        function callback(willUseFreeClasses) {

            const bookingsRef = firestore.collection("bookings")
            const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
            const classRef = firestore.collection("classes").doc(model.selectedTime)


            if (firestore && auth && account && model) {
                bookingsRef.add({
                    time: model.selectedTime,
                    userID: auth.currentUser.uid
                })

                if (account.freeClasses > 0) {
                    accountRef.update({
                        freeClasses: firebase.firestore.FieldValue.increment(-1)
                    })
                }

                if (willUseFreeClasses) {
                    classRef.update({
                        attendees: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                    })
                }


                history.push("/book/success")

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

                case "forupack":
                    incrementValue = 4
                    break

                case "tenpack":
                    incrementValue = 10
                    break

                case "membership":
                    incrementValue = 9999
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