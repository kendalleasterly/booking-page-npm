import React from 'react'

function Welcome(props) {

    function increment() {
        props.setStep(1)
    }

    return (
        <div>
            <p>Welcome</p>

            <button onClick = {increment}>Sign Up</button>

            <button onClick = {increment}>Log In</button>
        </div>
    )
}

export default Welcome
