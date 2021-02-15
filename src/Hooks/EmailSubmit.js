import { firestore, auth } from "../Global/firebase"
export default function useSubmitCredentials(email, password, errorHandler, name) {

    function signUp() {

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {

                const userRef = firestore.collection("users").doc(userCredential.user.uid)

                userRef.get()
                    .then((snapshot) => {
                        if (!snapshot.exists) {

                            userRef.set({
                                name: name,
                                email: email,
                                freeClasses: 0,
                                isMember: false
                            })
                        }
                    })
                    .catch(err => {
                        errorHandler(err)
                    })
            })
            .catch(err => {
                errorHandler(err.message)
            })
    }

    function logIn() {

        auth.signInWithEmailAndPassword(email, password)
            .catch(err => {

                if (err.message === "The password is invalid or the user does not have a password.") {
                    errorHandler("The password is invalid.")
                } else {
                    errorHandler(err.message)
                }
            })
    }

    if (name) {
        return signUp
    } else {
        return logIn
    }

}