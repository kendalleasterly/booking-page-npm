import {useSubmitFlow} from "./useSubmitFlow"


function SignUp() {

    const submit = useSubmitFlow()

    return (
        <div>

            <p>Sign Up</p>
            <p>name</p>

            <div><input type="text" /></div>

            <p>Email</p>

            <div><input type="email" /></div>

            <p>Password</p>

            <div><input type="password"/></div>

            <button onClick = {() => submit("","","","")}>clicka me</button>

        </div>
    )
}

export default SignUp
