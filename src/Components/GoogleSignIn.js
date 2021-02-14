import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import GoogleImage from "../Images/google.svg"

import {fb, auth} from "../Services/firebase"

function GoogleSignIn(props) {

    const signInWithGoogle = () => {
        

        console.log("auth is", auth)
        const provider =  new fb.auth.GoogleAuthProvider()
        

        auth.signInWithRedirect(provider)
        
    }
    const history = useHistory()

    useEffect(() => {

        // history.push("/signin")

    }, [history])

    return (
        <div className = "w-full flex flex-col justify-center items-center h-9 h-screen space-y-10">

            <button onClick = {signInWithGoogle} className = "max-w-xs font-bold rounded-3xl bg-blue-100 text-center text-white w-full py-1.5 inline-block align-middle flex justify-center space-x-4 px-4"> 
            <img src={GoogleImage} alt=""/>
            <p className = "text-blue-500">Sign in with Google</p>
            </button>

        </div>
    )
}

export default GoogleSignIn