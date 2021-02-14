import React, { useState } from 'react'

import Welcome from "./Welcome"
import SignUp from "./EmailSignUp"
import SignIn from "./EmailSignIn"


function SignUpFlow() {

    const [step, setStep] = useState(0)
    let view = <p></p>


    switch (step) {
        case 0:
            view = <Welcome setStep = {setStep}/>
            break;
        case 1:
            view = <SignUp setStep = {setStep}/>
            break;
        case 2:
            view = <SignIn setStep = {setStep}/>
            break;
        default:
            break;
    }

    return (
        view
    )
}

export default SignUpFlow
