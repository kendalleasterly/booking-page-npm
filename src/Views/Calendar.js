import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import React, { useState, useEffect } from 'react'

import SubmitButton from "../Components/SubmitButton"
import { useCollectionOnce, useDocumentData } from "react-firebase-hooks/firestore"


let Context = React.createContext()

function Calendar(props) {

    const firestore = props.firestore
    const auth = props.auth

    const classesRef = firestore.collection("classes")
    const [classes, cloading, cerror] = useCollectionOnce(classesRef)
    //if you get an error with this after making it dynamic, it's because you need to add the 0 in 01
    const currentMonth = "01"
    const [error, setError] = useState(false)
    const [availableDays, setAvailableDays] = useState({})
    const [selectedDay, setSelectedDay] = useState(new Date().getDate())
    const daysArray = ["S", "M", "T", "W", "T", "F", "S"]

    useEffect(() => {

        if (classes) {

            // read from firebase
            // make array of days you get
            // then check if the length of attendees is 8, don't include the number

            let availableDaysDict = {}

            classes.docs.forEach(element => {
                const id = element.id
                const timeArray = id.split("-")
                const month = timeArray[1]
                const day = parseInt(timeArray[2], 10)
                const time = timeArray[3] + "-" + timeArray[4]
                const attendeeCount = element.data().attendees.length


                if (month === currentMonth && attendeeCount < 9) {

                    availableDaysDict[day] = time

                }
            });

            setAvailableDays(availableDaysDict)
            let keys = Object.keys(availableDays)
            console.log(keys)

        }

    }, [classes])

    const getDays = function (year, month) {
        let numOfDays = new Date(year, month, 0).getDate();
        let dayArray = []

        let i
        for (i = 0; i < numOfDays; i++) {
            dayArray.push(i + 1)
        }
        return dayArray
    };

    const decideOffset = function () {
        let d = new Date(2021, 0, 1)
        let offset = d.getDay()

        let offsetArray = []
        let i
        for (i = 0; i < offset; i++) {
            offsetArray.push(i)
        }

        return offsetArray
    }


    return (
        <div className="font-bold text-xl space-y-8 mx-auto">
            <div className="rounded-3xl bg-white grid gap-7 max-w-sm grid-cols-7 text-center text-blue-500 p-7 shadow-md">
                {daysArray.map((element, key) => <p key={key} className="text-gray-700">{element}</p>)}


                {decideOffset().map((element, key) => <p key={key}></p>)}

                {getDays(2021, 0).map((element, key) => <Day day={element} key={key}/>)}

            </div>

            <InfoCard/>

        </div>
    )

    function Day(props) {

        let disabled = true

        const decideStyling = function () {

            let availableDaysKeys = Object.keys(availableDays)
            let string = props.day + ""

            if (selectedDay === props.day) {

                if (availableDaysKeys.includes(string)) {
                    disabled = false
                    return "text-white font-bold w-8 h-8 bg-blue-500 rounded-full"
                } else {
                    disabled = true
                    return "text-white font-bold w-8 h-8 bg-gray-300 rounded-full"
                }

            } else if (availableDaysKeys.includes(string)) {
                disabled = false
                return "font-bold text-blue-500 w-8 h-8"
            } else {
                return "font-bold text-gray-300 w-8 h-8"

            }

        }

        const changeSelectedDay = function () {

            setSelectedDay(props.day)
        }


        if (disabled) {
            return (
                <button onClick={changeSelectedDay} className={decideStyling()} disabled={disabled}>{props.day}</button>
            )
        } else {
            return (
                <button onClick={changeSelectedDay} className={decideStyling()} >{props.day}</button>
            )
        }

    }

    function InfoCard() {

        let element = <i className = "font-normal mx-auto">Sorry, there are no classes for this day. Please select an available day.</i>
        let account = props.account

        useEffect(() => {
            
            if(account) {
                console.log(account)
            }

        }, [account])

        const formatDate = function () {
            const year = "2021"
            const month = "01"
            const day = "03"
            const time = "07-45"

            return year + "-" + month + "-" + day + "-" + time
        }

        const formatTime = function(time) {
            let splitTime = time.split("-")
            let hour = parseInt(splitTime[0], 10)
            let minute = splitTime[1]

            return hour + ":" + minute
        }

        const decideNextStep = function() {
            if (account.freeClasses > 0) {
                console.log(1)
                return 1
            } else {
                console.log(2)
                return 2
            }
            
        }


        let availableDaysKeys = Object.keys(availableDays)
        let string = selectedDay + ""

        if (availableDaysKeys.includes(string)) {

            let time = availableDays[string]

            element = 
            <div className="rounded-3xl  bg-white max-w-sm text-left p-7 text-gray-900 space-y-4 shadow-md">
                <p className="float-right text-lg font-normal text-gray-400">January {selectedDay}</p>

                <div>
                    <p className="text-lg text-gray-400">Time</p>
                    <p>{formatTime(time)}</p>
                </div>

                <div>
                    <p className="text-lg text-gray-400">Teacher</p>
                    <p className="mb-5">Jason Easterly</p>
                </div>

                <button onClick = {() => {props.setStep(decideNextStep())}} className="font-bold rounded-3xl bg-blue-500 text-center text-white w-full py-1.5">Next</button>
                {/* <SubmitButton time={formatDate()} /> */}

            </div>
            
        }

        //first, get the current selected day. If you can find it in the availableDays dictionary, 
        //then format the time value using a function and put the return of it and add it to it's dom element
        //put the day in it's dom element using the variable
        return (
            element
        )
    }


}

export default Calendar