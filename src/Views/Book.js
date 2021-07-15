import Calendar from "./Calendar"
import ClassesAvailable from "./ClassesAvailable"
import Payment from "./Payment"
import { Route, Switch, useParams } from "react-router-dom"
import {useState} from "react"

import {auth, firestore} from "../Global/firebase"

function Book(props) {

    // const [selectedTime, setSelectedTime] = useState("")
    const account = props.account
    return (
        <div>
            <Switch>
                <Route exact path="/book">
                    <Calendar
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/book/usefreeclasses/:selectedTime/:type">
                    <ClassesAvailable
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/book/payment/:selectedTime/:type">
                    <Payment
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/book/success/:bookTime">
                
                <BookingSuccess/>
                </Route>

            </Switch>

        </div>
    )

    function BookingSuccess(props) {
        const {bookTime} = useParams()

        let bookDate = new Date()
        bookDate.setTime(bookTime)

        return (
            <div>
                <p className="text-center font-semibold text-xl">Your Payment has gone through, and you have successfuly reserved a spot with us at East Kickboxing Club. Thank You!</p>
                <p className = "text-center py-4">Your class is for {bookDate.toLocaleDateString()} at {bookDate.toLocaleTimeString()}.</p>
            </div>
        )

    }

}

export default Book