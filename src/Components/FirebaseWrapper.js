import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import { useRecoilState, RecoilRoot } from "recoil"
import { authAtom, firestoreAtom } from "../atoms"

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCKoM5avYL1KHa5Z19W-OqIGZ6N1mN7_IA",
        authDomain: "east-kickboxing-booking.firebaseapp.com",
        projectId: "east-kickboxing-booking",
        storageBucket: "east-kickboxing-booking.appspot.com",
        messagingSenderId: "378920786387",
        appId: "1:378920786387:web:ff23f67d0096fa4de97726",
        measurementId: "G-RQWW28MLYR"
    })
}

const firestore = firebase.firestore()
const auth = firebase.auth()

function FirebaseWrapper(props) {

    const [authValue, setAuth] = useRecoilState(authAtom)
    const [firestoreValue, setFirestore] = useRecoilState(firestoreAtom)

    setAuth(auth)
    setFirestore(firestore)

    return (
        <div>
            {props.children}
        </div>
    )
}

export default FirebaseWrapper
