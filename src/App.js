import "tailwindcss/tailwind.css"
import React, { useEffect } from "react"
import { BrowserRouter as Router, useHistory } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { Helmet, HelmetProvider } from "react-helmet-async"

import {auth, firestore} from "./Services/firebase"

import GoogleSignIn from "./Components/GoogleSignIn"
import Main from "./Views/Main"


function App() {

  const [user] = useAuthState(auth)
  const history = useHistory()

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
                  isMember: false
                })
              }
            })
        }
      }).catch((err) => {

        history.push("/error")
        console.log("We're sorry, but there was an error signing you in. Please contact support@eastkickboxingclub.com:", err.message)
        
      })
  }, [user])

  //you have two different routes that you can control. what needs to happen is that when you sign in, app.js needs to get that 
  //and upload the user's new information.
  return (
    <HelmetProvider>

      <Router className="z-50">
        <link rel="stylesheet" href="https://css.gg/css" />

        <Helmet>
          <style>{'body { background-color: #FAFAFA;; }'}</style>
        </Helmet>

        {user ? <Main /> : <GoogleSignIn />}

      </Router>
    </HelmetProvider>


  );
}


export default App;
