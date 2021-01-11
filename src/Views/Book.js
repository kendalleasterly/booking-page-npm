import { useCollectionData } from "react-firebase-hooks/firestore"
import { useState, setState, useEffect } from "react"

import Calendar from "./Calendar"
import ClassesAvailable from "./ClassesAvailable"
import Payment from "./Payment"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { Route, Switch, useHistory } from "react-router-dom"

class BookingModel {

    selectedTime = ""
    checkedAvailableClasses = false
    willUseAvailableClass = false

}

function Book(props) {

    const firestore = props.firestore
    const auth = props.auth
    const history = useHistory()
    let model = new BookingModel()

    const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
    const [account, aloading, aerror] = useDocumentData(accountRef)

    const [step, setStep] = useState(0)
    let stepComponent = <Calendar setStep={setStep} />

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
        </div>
    )

    function GoogleSignOut() {
        return (
            <button onClick={() => props.auth.signOut()}>sign out</button>
        )
    }
}

export default Book