
import React, { useState, useEffect } from 'react'

import SubmitButton from "../Components/SubmitButton"
import { useCollectionOnce, useDocumentData } from "react-firebase-hooks/firestore"

function ClassesAvailable(props) {

    const firestore = props.firestore
    const auth = props.auth
    const account = props.account

    const decideText = function () {
        console.log(account)
        if (account.freeClasses != 1) {
            return [`You have ${account.freeClasses} free classes left.`, "Would you like to use one?"]
        } else {
            return ["You have 1 free class left.", "Would you like to use it?"]
        }

    }

    return (
        <div className="rounded-3xl bg-gray-100 max-w-sm text-left p-7 text-gray-900 space-y-4">
            <button className="float-lef gg-chevron-left text-blue-500" onClick={() => { props.setStep(0) }}></button>
            <div className="float-center text-center font-semibold space-y-1">
                <p className="text-l">{decideText()[0]}</p>
                <p className="text-sm">{decideText()[1]}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-2.5">
                <button onClick={() => { props.setStep(2) }} className="border-black border-2 rounded-3xl py-0.5">No</button>
                <SubmitButton
                    firestore={firestore}
                    auth={auth}
                    text="Yes"
                    className="bg-blue-500 rounded-3xl text-white"
                    onClick={() => { props.setStep(3) }} />
            </div>
        </div>
    )
}

export default ClassesAvailable