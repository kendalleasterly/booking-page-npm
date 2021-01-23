
import Calendar from "./Calendar"
import ClassesAvailable from "./ClassesAvailable"
import Payment from "./Payment"
import { Route, Switch } from "react-router-dom"
import {useState} from "react"

class BookingModel {

    selectedTime = ""
    // willUseAvailableClass = false
    
    /* if you have any errors here, it's because when you defined it you used state. So whenvever you changed a value, it
    didn't update in state. you need to do setModel(model.lkdjfslk = slkdfjs) to get it working correctly. */

}
//the home page needs to exist. That's what you go to once you sign in. Then there are links. Book and Product.
function Book(props) {

    const firestore = props.firestore
    const auth = props.auth
    const [model, setModel] = useState(new BookingModel())

    const account = props.account
    return (
        <div>
            <Switch>
                <Route exact path="/book">
                    <Calendar
                        firestore={firestore}
                        auth={auth}
                        model = {model}
                        account={account} />
                </Route>

                <Route path="/book/usefreeclasses">
                    <ClassesAvailable
                        model = {model}
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/book/payment">
                    <Payment
                        model = {model}
                        firestore={firestore}
                        auth={auth}
                        account={account} />
                </Route>

                <Route path="/book/success">
                    <p>IT WAS A SUCCESS!!!</p>
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