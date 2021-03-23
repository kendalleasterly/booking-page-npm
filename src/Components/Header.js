import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import Dollar from "../Images/dollar.svg"
import Home from "../Images/home.svg"
import ShoppingCart from "../Images/shopping-cart.svg"
import CalendarToday from "../Images/calendar-today.svg"

import {auth, firestore} from "../Global/firebase"

function Header(props) {

    const [name, setName] = useState("")
    const [freeClasses, setFreeClasses] = useState(0)
    const [showingMenu, setShowingMenu] = useState(false)
    const [nextClassString, setNextClassString] = useState("You have no upcoming classes")
    const history = useHistory()
    const menuTransition = useTransition(showingMenu, null, {
        from: { position: "fixed", opacity: 0, transform: "translatex(-100%)" },
        enter: { opacity: 1, transform: "translatex(0%)" },
        leave: { opacity: 0, transform: "translatex(-100%)" }


    })

    const maskTransition = useTransition(showingMenu, null, {
        from: { position: 'fixed', opacity: 0 },
        enter: { opacity: 0.2 },
        leave: { opacity: 0 },
    })

    useEffect(() => {

        if (props.account) {
            setName(props.account.name)
            setFreeClasses(props.account.freeClasses)
        }

    }, [props.account])


    const dismissMenu = function () {
        setShowingMenu(false)
    }

    const decideCreditInfo = function () {

        if (props.account.isMember) {
            return "You have an unlimited amount of classes"
        } else if (freeClasses === 1) {
            return "You have one class remianing"
        } else if (freeClasses === 0) {
            return "You have no classes"
        } else {
            return `You have ${freeClasses} classes remaining`
        }

    }

    const signOut = function () {

        props.auth.signOut()
        history.push("/signin")

    }

    const getNextClass = function () {

        const now = new Date()
        const year = now.getFullYear()
        let month = now.getMonth()
        let day = now.getDate()
        let hour = now.getHours()
        let minute = now.getMinutes()

        const makeIntoDoubleDigits = function (value) {
            if (value < 10) {
                return "0" + value
            } else {
                return value
            }
        }

        let currentID = year + "-" +
            makeIntoDoubleDigits(month) + "-" +
            makeIntoDoubleDigits(day) + "-" +
            makeIntoDoubleDigits(hour) + "-" +
            makeIntoDoubleDigits(minute)

        let uid = ""

        if (auth.currentUser) {
            uid = auth.currentUser.uid
        }

        let queryRef = firestore.collection("bookings")
            .where("userID", "==", uid)
            .where("time", ">=", currentID)
            .orderBy("time")

        queryRef
            .get()
            .then(function (querySnapshot) {

                let returnValue = "You have no upcoming classes"

                let bookingsArray = []

                querySnapshot.forEach(function (doc) {

                    bookingsArray.push(doc.data())

                })

                if (bookingsArray[0]) {

                    const nextClass = bookingsArray[0].time

                    let nextClassParts = nextClass.split("-")

                    let nextClassDate = new Date(nextClassParts[0],
                        nextClassParts[1],
                        nextClassParts[2],
                        nextClassParts[3],
                        nextClassParts[4])


                    const nextClassTime = nextClassDate.getHours() + ":" + makeIntoDoubleDigits(nextClassDate.getMinutes())

                    const distance = nextClassDate.getTime() - now.getTime()
                    const distanceInDays = distance / (1000 * 60 * 60 * 24)

                    const isToday = 100 * (nextClassDate.getFullYear() - now.getFullYear()) +
                        10 * (nextClassDate.getMonth() - now.getMonth()) +
                        (nextClassDate.getDate() - now.getDate())

                    if (isToday === 0) {

                        returnValue = "Your next class is today at " + nextClassTime

                    } else if (isToday === 1) {

                        returnValue = "Your next class is tomorrow at " + nextClassTime

                    } else if (distanceInDays < 7) {

                        let day = nextClassDate.getDay()


                        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

                        returnValue = "Your next class is " + weekday[day] + " at " + nextClassTime

                    } else {

                        const nextClassDateString = nextClassDate.toLocaleDateString()
                        const nextClassDateStringSplit = nextClassDateString.split("/")
                        const nextClassDateStringShortened = nextClassDateStringSplit[0] + "/" + nextClassDateStringSplit[1]

                        returnValue = "Your next class is " + nextClassDateStringShortened + " at " + nextClassTime


                    }

                }

                setNextClassString(returnValue)

            })
    }

    getNextClass()

    return (
        <nav>
            <button onClick={() => setShowingMenu(!showingMenu)} className="relative pb-4">
                {/* <div className="w-9 h-9 bg-gray-200 flex justify-center rounded-full">
                    <img src="https://css.gg/user.svg" alt="" />
                </div> */}

                <Icon image="user" />

            </button>

            {
                maskTransition.map(({ item, key, props }) =>
                    item &&
                    <animated.div
                        className="top-0 left-0 fixed bg-black w-screen h-screen z-50"
                        style={props}
                        key={key}
                        onClick={dismissMenu}>
                    </animated.div>
                )
            }

            {
                menuTransition.map(({ item, key, props }) =>
                    item &&
                    <animated.div
                        style={props}
                        key={key}
                        className="top-0 left-0 fixed bg-gray-50 h-screen p-7 z-50 md:rounded-tr-3xl md:rounded-br-3xl justify-between overflow-auto place-content-between">

                        <div className="flex items-start">
                            <div className="space-y-10">

                                <Section
                                    title="Your Account"
                                    items={[
                                        {
                                            title: name,
                                            icon: "user"
                                        },
                                        {
                                            title: decideCreditInfo(),
                                            icon: Dollar,
                                            link: "/products"
                                        }//,
                                        // {
                                        //     title: nextClassString,
                                        //     icon: "calendar-today"
                                        // }
                                    ]}
                                />

                                <Section
                                    title="Quick Links"
                                    items={[
                                        {
                                            title: "Return to Homepage",
                                            icon: Home,
                                            link: "/"
                                        },
                                        {
                                            title: "Book a Class",
                                            icon: CalendarToday,
                                            link: "/book"
                                        },
                                        {
                                            title: "Purchase Bundles",
                                            icon: ShoppingCart,
                                            link: "/products"
                                        }
                                    ]}
                                />

                            </div>

                            <button onClick={dismissMenu}>
                                <img src="https://css.gg/close.svg" alt="" />
                            </button>

                        </div>

                        <button
                            className="font-semibold rounded-3xl bg-blue-500 text-center text-white w-full py-1.5 mt-7"
                            onClick={signOut} >
                            Sign Out
                            </button>

                    </animated.div>
                )
            }
        </nav>
    )

    function Section(props) {

        const title = props.title
        const items = props.items

        return (

            <div className="space-y-7">
                <p className="text-2xl font-bold">{title}</p>

                {items.map((item, key) =>
                    item.link ?

                        <Link to={item.link} className="flex items-center space-x-4" key={key} onClick={dismissMenu} >
                            <Icon
                                image={item.icon}
                                isLink={true} />
                            <p>{item.title}</p>
                        </Link>


                        :

                        <div className="flex items-center space-x-4" key={key}>
                            <Icon image={item.icon} />
                            <p>{item.title}</p>
                        </div>

                )}
            </div>

        )
    }

    function Icon(props) {


        if (props.image === "user") {
            return (

                <div className="w-9 h-9 bg-gray-200 flex rounded-full">
                    <img src="https://css.gg/user.svg" alt="" className="w-6 h-6 mx-auto my-auto" />
                </div>
            )

        } else if (props.image === "calendar-today") {
            return (
                <div className="w-9 h-9 bg-gray-200 flex rounded-full">
                    <img src="https://css.gg/calendar-today.svg" alt="" className="w-6 h-6 mx-auto my-auto" />
                </div>
            )

        } else {

            return (

                <div className="w-9 h-9 bg-gray-200 flex rounded-full">
                    <img src={props.image} alt="" className="w-6 h-6 mx-auto my-auto" />
                </div>


            )

        }

    }

}

export default Header
