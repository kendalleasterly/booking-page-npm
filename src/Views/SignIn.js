import React, { useEffect } from 'react'

function SignIn(props) {


    useEffect(() => {
        
        props.auth.getRedirectResult()
        .then((result) => {
          if (result.credential) {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
      
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // ...
          }
          // The signed-in user info.
          var user = result.user;
        })

    }, [props])

    return (
        <div>
            
        </div>
    )
}

export default SignIn
