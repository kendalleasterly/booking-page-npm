import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import React from 'react'


function SubmitButton(props) {

    //if you have trouble with this it's because you didn't pass it in
    const auth = props.auth
    const firestore = props.firestore
    const bookingsRef = firestore.collection("bookings")
    const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
    const classRef = firestore.collection("classes").doc(props.time)

    // const bookings = useCollectionOnce(bookingsRef)
const account = props.account

    const createEvent = function() {
        bookingsRef.add({
            time: props.time,
            userID: auth.currentUser.uid
        })

        if (account.freeClasses > 0) {
            accountRef.update({
                freeClasses: firebase.firestore.FieldValue.increment(-1)
            })
        }

        classRef.update({
            attendees: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
        })
    }

    return (


            <button onClick = {createEvent}>{props.text}</button>


    )
}

export default SubmitButton
