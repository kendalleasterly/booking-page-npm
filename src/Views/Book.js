import Calendar from "./Calendar"
import ClassesAvailable from "./ClassesAvailable"
import Payment from "./Payment"
import { Route, Switch } from "react-router-dom"
import {useState} from "react"

import {auth, firestore} from "../Services/firebase"

function Book(props) {

    const [selectedTime, setSelectedTime] = useState("")
    const account = props.account
    return (
        <div>
            <Switch>
                <Route exact path="/book">
                    <Calendar
                        firestore={firestore}
                        auth={auth}
                        selectedTime = {selectedTime}
                        setSelectedTime = {setSelectedTime}
                        account={account} />
                </Route>

                <Route path="/book/usefreeclasses">
                    <ClassesAvailable
                        selectedTime = {selectedTime}
                        setSelectedTime = {setSelectedTime}
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/book/payment">
                    <Payment
                        selectedTime = {selectedTime}
                        setSelectedTime = {setSelectedTime}
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/book/success">
                <p className="text-center font-semibold text-xl">Your Payment has gone through, and you have successfuly reserved a spot with us at East Kickboxing Club. Thank You!</p>
                </Route>

            </Switch>

        </div>
    )
}

export default Book