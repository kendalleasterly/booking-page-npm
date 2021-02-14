import React from 'react'
import Book from "./Book"
import Products from "./Products"
import { Route, Switch, useParams } from "react-router-dom"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Header from "../Components/Header"
import NotFound from "./NotFound"
import Home from "./Home"

import {auth, firestore} from "../Services/firebase"

function Main(props) {

    const accountRef = firestore.collection("users").doc(auth.currentUser.uid)
    const [account] = useDocumentData(accountRef)

    const header = <Header
        firestore={firestore}
        account={account}
        auth={auth} />


    // const getErrorInfo = function () {

    //     let details = ""
    //     console.log("params are", id)
    //     if (id) {

    //         switch (id) {

    //             case "payment":
    //                 details = "An error with our payment servers caused a disruption."
    //                 break
    //             case "book":
    //                 details = "An error with our database servers caused a disruption."
    //                 break
    //             default:
    //                 break
    //         }
    //     }

    //     return details

    // }

    return (

        <div>
            {/* <div className="p-4"> */}

            {/* </div> */}


            <Switch>
                <Route exact path="/">

                    {/* {header} */}
                    <Home header={header} />


                </Route>

                <Route path="/book">
                    <div className="p-4">
                        {header}
                        <Book
                            firestore={props.firestore}
                            auth={props.auth}
                            account={account} />

                    </div>
                </Route>

                <Route path="/products">
                    <div className="p-4">
                        {header}
                        <Products
                            firestore={props.firestore}
                            auth={props.auth}
                            account={account} />
                    </div>
                </Route>

                <Route path = "/error">
                    <div className="p-4">
                        {header}

                        <p className="text-center font-semibold text-xl italic">We're sorry, but there was an error. Please try again.
                            <br /> If the problem persists, contact support@eastkickboxingclub.com for help.</p>
                        {/* <p className="text-l text-center mt-4">{getErrorInfo()}</p> */}


                    </div>
                </Route>

                <Route>
                    <div className="p-4">
                        {header}
                        <NotFound />

                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Main
