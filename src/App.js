import GoogleSignIn from "./Components/GoogleSignIn"
import Book from "./Views/Book"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "tailwindcss/tailwind.css"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { useAuthState } from "react-firebase-hooks/auth"


let Context = React.createContext()

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


const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  const [user] = useAuthState(auth)

  return (
    <Router >
      <link rel="stylesheet" href="https://css.gg/css" />
      {user ? <Book firestore={firestore} auth={auth} /> : <GoogleSignIn auth={auth} firebase={firebase} />}

      
    </Router>


  );
}


export default App;
