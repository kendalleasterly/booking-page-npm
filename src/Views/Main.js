import React from 'react'
import Book from "./Book"
import Products from "./Products"
import { Route, Switch } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Header from "../Components/Header"
import NotFound from "./NotFound"
import Home from "./Home"

function Main(props) {

    const accountRef = props.firestore.collection("users").doc(props.auth.currentUser.uid)
    const [account] = useDocumentData(accountRef)
    const header = <Header
    account={account}
    auth={props.auth} />
    return (

        <div>
            <div className="p-4">
                {header}
            </div>


            <Switch>
                <Route exact path="/">
                    {/* <div className="p-4"> */}

                        <Home header = {header} />

                    {/* </div> */}
                </Route>

                <Route path="/book">
                    <div className="p-4">

                        <Book
                            firestore={props.firestore}
                            auth={props.auth}
                            account={account} />

                    </div>
                </Route>

                <Route path="/products">
                    <div className="p-4">

                        <Products
                            firestore={props.firestore}
                            auth={props.auth}
                            account={account} />
                    </div>
                </Route>

                <Route>
                    <div className="p-4">

                        <NotFound />

                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Main
