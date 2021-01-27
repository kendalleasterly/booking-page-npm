
import Calendar from "./Calendar"
import ClassesAvailable from "./ClassesAvailable"
import Payment from "./Payment"
import { Route, Switch } from "react-router-dom"
import {useState} from "react"

function Book(props) {

    const firestore = props.firestore
    const auth = props.auth
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
                    <p>IT WAS A SUCCESS!!!</p>
                </Route>

            </Switch>

        </div>
    )
}

export default Book