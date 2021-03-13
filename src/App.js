import "tailwindcss/tailwind.css"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, useHistory } from "react-router-dom"

import { Helmet, HelmetProvider } from "react-helmet-async"

import {auth, firestore} from "./Global/firebase"

import Main from "./Views/Main"
import ChooseSignIn from "./Views/ChooseSignIn"


function App() {

  const history = useHistory()
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {

      console.log("the current user is", user)

      if (user) {
        console.log("returned true");
        setIsSignedIn(true)
      } else {
        console.log("returned false");
        setIsSignedIn(false)
      }
    });
  }, []);

  useEffect(() => {

    auth.getRedirectResult()
      .then((result) => {

        var user = result.user;

        if (user) {
          const uid = user.uid
          const userRef = firestore.collection("users").doc(uid)

          userRef.get()
            .then((snapshot) => {
              if (!snapshot.exists) {

                userRef.set({
                  name: user.displayName,
                  email: user.email,
                  freeClasses: 0,
                  isMember: false,
                  daysLeft: -1
                })
              }
            })
        }
      }).catch((err) => {

        history.push("/error")
        console.log("We're sorry, but there was an error signing you in. Please contact support@eastkickboxingclub.com:", err.message)
        
      })
  }, [])

  //you have two different routes that you can control. what needs to happen is that when you sign in, app.js needs to get that 
  //and upload the user's new information.
  return (
    <HelmetProvider>

      <Router className="z-50">
        <link rel="stylesheet" href="https://css.gg/css" />

        <Helmet>
          <style>{'body { background-color: #FAFAFA;; }'}</style>
        </Helmet>

        {isSignedIn ? <Main /> : <ChooseSignIn />}
        {/* {user ? <Main /> : < EmailContainer/>} */}

      </Router>
    </HelmetProvider>


  );
}


export default App;
