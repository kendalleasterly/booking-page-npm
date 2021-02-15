import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import useSubmitCredentials from "../Hooks/EmailSubmit"
import Back from "../Images/back.svg"
import {chooseSignInStepAtom} from "../Global/atoms"

function EmailSignIn(props) {

    const [choiceStep, setChoiceStep] = useRecoilState(chooseSignInStepAtom)
    const [step, setStep] = useRecoilState(props.stepAtom)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function errorHandler(error) {
        setError(error)
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            submitCredentials()
        }
    }

    function decideAssistance() {
        if (error !== "") {
            return "Please contact support@eastkickboxingclub.com for assistance if needed."
        }
    }

    const submitCredentials = useSubmitCredentials(email, password, errorHandler)

    return (
        <div>
            <div className="space-y-10 mx-auto card">
                <div>
                    <button onClick = {() => setChoiceStep(0)}><img src={Back} alt=""/></button>
                    <p className="text-xl text-gray-900 font-bold text-center">Sign In</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-gray-500 semibold">Email</p>
                        <div><input
                            type="email"
                            className="rounded-full border focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-300 border-gray-300 text-center w-full py-1"
                            onChange={event => setEmail(event.target.value)} /></div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-gray-500 semibold">Password</p>
                        <div><input type="password"
                            className="rounded-full border focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-300 border-gray-300 text-center w-full py-1"
                            onChange={event => setPassword(event.target.value)}
                            onKeyDown={handleKeyDown} /></div>
                    </div>

                </div>
                <div>
                    <button onClick={submitCredentials} className="font-semibold rounded-3xl bg-blue-500 text-center text-white w-full py-1.5 focus:outline-none">Submit</button>
                    <button onClick={() => setStep(0)} className="w-full focus:outline-none">
                        <p className="text-blue-500 mx-auto max-w-sm lg:max-w-md text-center mt-7 ">Don't have an account? Sign Up!</p>
                    </button>
                </div>
            </div>

            <p className="text-red-400 mx-auto max-w-sm lg:max-w-md text-center mt-7">{error} <br />{decideAssistance()} </p>

        </div>

    )
}

export default EmailSignIn