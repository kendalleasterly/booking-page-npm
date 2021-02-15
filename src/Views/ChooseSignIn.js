import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from "recoil"
import { chooseSignInStepAtom } from "../Global/atoms"
import EmailContainer from "./EmailContainer"

import GoogleImage from "../Images/google.svg"
import Email from "../Images/mail.svg"

import { fb, auth } from "../Global/firebase"

function ChooseSignIn(props) {

    const [step, setStep] = useRecoilState(chooseSignInStepAtom)

    const signInWithGoogle = () => {


        console.log("auth is", auth)
        const provider = new fb.auth.GoogleAuthProvider()

        auth.signInWithRedirect(provider)

    }

    if (step === 0) {
        return (
            <div className="w-full flex flex-col justify-center items-center h-screen space-y-10">

                <button onClick={signInWithGoogle} className="max-w-xs font-bold rounded-3xl bg-blue-100 text-center text-white w-full py-1.5 align-middle flex justify-center space-x-4 px-4">
                    <img src={GoogleImage} alt="" />
                    <p className="text-blue-500">Sign in with Google</p>
                </button>

                <button onClick={() => setStep(1)} className="max-w-xs font-bold rounded-3xl bg-indigo-100 text-center text-white w-full py-1.5 align-middle flex justify-center space-x-4 px-4">
                    <img src={Email} alt="" />
                    <p className="text-indigo-500">Sign in with Email</p>
                </button>

            </div>
        )
    } else {

        return (<EmailContainer/>)

    }

}

export default ChooseSignIn