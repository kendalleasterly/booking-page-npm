import React, { useState, useEffect } from 'react'
import "firebase/auth"
import "firebase/firestore"

import {auth, firestore} from "../Global/firebase"
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import { Link } from "react-router-dom"

const getCurrentMonth = function () {
    let month = new Date().getMonth()

    if (month < 10) {
        return "0" + month
    } else {
        return `${month}`
    }
}

function Calendar(props) {

    const setSelectedTime = props.setSelectedTime

    const classesRef = firestore.collection("classes")
    const [classes] = useCollectionOnce(classesRef)
    //if you get an error with this after making it dynamic, it's because you need to add the 0 in 01
    const currentMonth = getCurrentMonth()
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
                const currentDay = new Date().getDate()

                if (month === currentMonth && attendeeCount < 8 && day >= currentDay) {
console.log(id, "ran")
                    availableDaysDict[day] = id

                }
            });

            setAvailableDays(availableDaysDict)

        }

    }, [classes])

    useEffect(() => {
        console.log("available days are", availableDays)
        console.log("selected day is", availableDays[selectedDay])

    }, [availableDays])

    const getDays = function () {

        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()

        let numOfDays = new Date(currentYear, currentMonth + 1, 0).getDate();
        console.log("there are this many days", numOfDays)
        let dayArray = []

        let i
        for (i = 0; i < numOfDays; i++) {
            dayArray.push(i + 1)
        }
        return dayArray
    };

    const decideOffset = function () {
        const now = new Date()
        let d = new Date(now.getFullYear(), now.getMonth(), 1)
        let offset = d.getDay()


        let offsetArray = []
        let i
        for (i = 0; i < offset; i++) {
            offsetArray.push(i)
        }

        return offsetArray
    }


    return (
        <div className="font-bold text-xl space-y-8 ">
            <div className="card grid gap-7 grid-cols-7 text-center text-blue-500 ">
                {daysArray.map((element, key) => <p key={key} className="text-gray-700 text-center">{element}</p>)}


                {decideOffset().map((element, key) => <p key={key}></p>)}

                {getDays().map((element, key) => <Day day={element} key={key} selectedTime={props.selectedTime} />)}

            </div>

            <InfoCard />

        </div>
    )

    function Day(props) {

        let disabled = true

        const decideStyling = function () {

            let availableDaysKeys = Object.keys(availableDays)
            let string = props.day + ""

            if (selectedDay === props.day) {

                if (availableDaysKeys.includes(string)) {

                    setSelectedTime(availableDays[props.day])
                    console.log("we've set the selected time")

                    disabled = false
                    return "text-white font-bold w-8 h-8 bg-blue-500 rounded-full text-center"
                } else {
                    disabled = true
                    return "text-white font-bold w-8 h-8 bg-gray-300 rounded-full text-center"
                    //TODO: add a feature that makes sure if a day has already passed, it is disabled.
                }

            } else if (availableDaysKeys.includes(string)) {
                disabled = false
                return "font-bold text-blue-500 w-8 h-8 text-center"
            } else {
                return "font-bold text-gray-300 w-8 h-8 text-center"

            }

        }

        const changeSelectedDay = function () {


            setSelectedDay(props.day)
            console.log("selected day from change is", availableDays[props.day])
            
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

        let element = <p className="w-full text-center font-normal text-gray-400">Sorry, there are no classes for this day. Please select an available day.</p>
        let account = props.account

        const formatTime = function (time) {
            //note: time is in the format of the firebase doucment ID

            const timeArray = time.split("-")
            const plainHour = timeArray[3]
            const minute = timeArray[4]

            const hour = Number(plainHour).toString()

            return hour + ":" + minute
        }

        const decideNextStep = function () {
            console.log(account)
            if (account.freeClasses > 0 || account.isMember) {

                return "/book/usefreeclasses"
            } else {
                return "/book/payment"
            }
        }


        let availableDaysKeys = Object.keys(availableDays)
        let string = selectedDay + ""

        if (availableDaysKeys.includes(string)) {

            let time = availableDays[string]

            element =
                <div className="card text-left text-gray-900 space-y-4">
                    <p className="float-right text-lg font-normal text-gray-400">January {selectedDay}</p>

                    <div>
                        <p className="text-lg text-gray-400">Time</p>
                        <p>{formatTime(time)} AM</p>
                    </div>

                    <div>
                        <p className="text-lg text-gray-400">Price</p>
                        <p className="mb-5">$15.00</p>
                    </div>

                    <div>
                        <p className="text-lg text-gray-400">Teacher</p>
                        <p className="mb-5">Jason Easterly</p>
                    </div>

                    <Link to={decideNextStep()}>
                        <p className="font-bold rounded-3xl bg-blue-500 text-center text-white w-full py-1.5">Next</p>
                    </Link>

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