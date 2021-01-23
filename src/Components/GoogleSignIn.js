import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function GoogleSignIn(props) {

    const signInWithGoogle = () => {
        const provider = new props.firebase.auth.GoogleAuthProvider()
        props.auth.signInWithRedirect(provider)
        
    }
    const history = useHistory()

    useEffect(() => {

        // history.push("/signin")

    }, [history])

    return (
        <div>
            <button onClick = {signInWithGoogle} className = "p-7"> Sign in with Google</button>
        </div>
    )
}

export default GoogleSignIn