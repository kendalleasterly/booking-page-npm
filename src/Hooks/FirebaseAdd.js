import firebase from "firebase/app"
import { useHistory } from "react-router-dom"

export function useCreateEvent(firestore, auth, account, model) {

    const history = useHistory()

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
            

            history.push("/success")

        }
    }
    
    return callback

}