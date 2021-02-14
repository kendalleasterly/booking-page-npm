import {firestoreAtom, authAtom} from "../../atoms"
import {useRecoilValue} from "recoil"

export function useSubmitFlow() { 

    const firestore = useRecoilValue(firestoreAtom)

    function doSth(email, password, error, name) {
        
        firestore.collection("users").doc("zGgo5fywW8ZrVw7gzus3mK3dshG3").get()
        .then(doc => {
            if(doc.exists) {
                console.log(doc.data())
            }
        })
    }
    
    return doSth
}