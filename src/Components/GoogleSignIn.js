
import React from 'react'

function GoogleSignIn(props) {

    const signInWithGoogle = () => {
        const provider = new props.firebase.auth.GoogleAuthProvider()
        props.auth.signInWithPopup(provider)
    }

    return (
        <div>
            <button onClick = {signInWithGoogle}> Sign in with Google</button>
        </div>
    )
}

export default GoogleSignIn