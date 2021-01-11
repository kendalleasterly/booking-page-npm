import SubmitButton from "../Components/SubmitButton"
import {useHistory, Link} from "react-router-dom"

function ClassesAvailable(props) {

    const firestore = props.firestore
    const auth = props.auth
    const account = props.account
    const history = useHistory()
    const model = props.model

    const decideText = function () {
        if (account) {
            if (account.freeClasses !== 1) {
                return [`You have ${account.freeClasses} free classes left.`, "Would you like to use one?"]
            } else {
                return ["You have 1 free class left.", "Would you like to use it?"]
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

if(model.selectedTime === "") {
    history.push("/")
}

    return (

        <div className="rounded-3xl bg-white hasShadow max-w-sm text-left p-7 text-gray-900 space-y-4">
            <Link to = "/">
            <p className="gg-chevron-left text-blue-500"></p>
            </Link>
            
            <div className="float-center text-center font-semibold space-y-1">
                <p className="text-l">{decideText()[0]}</p>
                <p className="text-sm">{decideText()[1]}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-2.5">
                <Link to = "/payment" className="border-black border-2 rounded-3xl p-0.5 text-center">
                <p >No</p>
                </Link>
                
                {/* this needs to do all neccessary firebase things. It can be reused in the payment button */}
                <Link to = "/success" className="bg-blue-500 text-white rounded-3xl py-0.5 text-center">
                
                <SubmitButton
                    firestore={firestore}
                    auth={auth}
                    text="Yes"/>

                </Link>
                

                
            </div>
        </div>
    )
}

export default ClassesAvailable