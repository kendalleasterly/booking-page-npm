import {useCreateEvent } from "../Hooks/FirebaseAdd"
import {useHistory, Link} from "react-router-dom"
import BackButton from "../Components/BackButton"
import {useEffect} from "react"

function ClassesAvailable(props) {
    
    const account = props.account
    const history = useHistory()
    const model = props.model
    const createEvent = useCreateEvent(props.firestore, props.auth, account, model)

    const decideText = function () {
        if (account) {
            if (account.freeClasses === 1) {
                return ["You have 1 free class left.", "Would you like to use it?"]
            } else if (account.isMember) {
                return [`You have an unlimted amount of free classes.`, "Would you like to use one?"]
            } else {
                return [`You have ${account.freeClasses} free classes left.`, "Would you like to use one?"]
            }
        } else {
            console.log("there was no account")
            return ["Loading...", ""]
        }
        

    }

/*TODO: to avoid error, you can simply put the contents of the component in a variable, and show the variable in the 
return statement. You create a default variable value which is a regular p, and then you have an if statement right here
that checks whther or not we have checked to see if we have available classes. if we have not, we will history.push the 
og page */

useEffect(() => {
   
    if(model.selectedTime === "") {
        history.push("/")
    }

}, [model])

    return (

        <div className="card text-left text-gray-900 space-y-4">
            
            <BackButton to="/book" />
            
            <div className="float-center text-center font-semibold space-y-1">
                <p className="text-l">{decideText()[0]}</p>
                <p className="text-sm">{decideText()[1]}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-2.5">
                <Link to = "/book/payment" className="border-black border-2 rounded-3xl p-0.5 text-center">
                <p >No</p>
                </Link>
                
                {/* this needs to do all neccessary firebase things. It can be reused in the payment button */}

                <button onClick = {() => createEvent(true)} className="bg-blue-500 text-white rounded-3xl py-0.5 text-center">Yes</button>
                
            </div>
        </div>
    )
}

export default ClassesAvailable