
import Calendar from "./Calendar"
import ClassesAvailable from "./ClassesAvailable"
import Payment from "./Payment"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { Route, Switch } from "react-router-dom"
import {useState} from "react"

class BookingModel {

    selectedTime = ""
    willUseAvailableClass = false
    /* if you have any errors here, it's because when you defined it you used state. So whenvever you changed a value, it
    didn't update in state. you need to do setModel(model.lkdjfslk = slkdfjs) to get it working correctly. */

}

function Book(props) {

    const firestore = props.firestore
    const auth = props.auth
    const [model, setModel] = useState(new BookingModel())

    const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
    const [account] = useDocumentData(accountRef)

    return (
        <div className="bg-gray-50 h-screen">
            <Switch>
                <Route exact path="/">
                    <Calendar
                        firestore={firestore}
                        auth={auth}
                        model = {model}
                        account={account} />
                </Route>

                <Route path="/usefreeclasses">
                    <ClassesAvailable
                        model = {model}
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/payment">
                    <Payment
                        model = {model}
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

            </Switch>

        <GoogleSignOut/>

        </div>
    )

    function GoogleSignOut() {
        return (
            <button onClick={() => props.auth.signOut()}>sign out</button>
        )
    }
}

export default Book