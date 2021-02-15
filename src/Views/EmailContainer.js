import {atom, useRecoilState, useRecoilValue} from "recoil"

import EmailSignUp from "./EmailSignUp"
import EmailSignIn from "./EmailSignIn"

const stepAtom = atom({
    key: "step",
    default: 0
})

function EmailContainer() {

    const step = useRecoilValue(stepAtom)
    let view = <p></p>

    switch (step) {
        case 0:
            view = <EmailSignUp stepAtom = {stepAtom}/>
            break;
        case 1:
            view = <EmailSignIn stepAtom = {stepAtom}/>
            break;
        default:
            break;
    }

    return (
        <div className = "p-7">
            {view}
        </div>

    )
}

export default EmailContainer
