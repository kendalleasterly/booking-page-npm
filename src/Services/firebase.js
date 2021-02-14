import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"


if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyCKoM5avYL1KHa5Z19W-OqIGZ6N1mN7_IA",
      authDomain: "east-kickboxing-booking.firebaseapp.com",
      projectId: "east-kickboxing-booking",
      storageBucket: "east-kickboxing-booking.appspot.com",
      messagingSenderId: "378920786387",
      appId: "1:378920786387:web:ff23f67d0096fa4de97726",
      measurementId: "G-RQWW28MLYR"
    })
  }


export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const fb = firebase
