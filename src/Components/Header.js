import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import Icon from './Icon'

function Header(props) {

    const [name, setName] = useState("")
    const [freeClasses, setFreeClasses] = useState(0)
    const [showingMenu, setShowingMenu] = useState(false)
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
            return "You have an unlimited amount of free classes"
        } else if (freeClasses === 1) {
            return "You have one free class remianing"
        } else if (freeClasses === 0) {
            return "You have no free classes"
        } else {
            return `You have ${freeClasses} free classes remaining`
        }

    }

    const signOut = function () {

        props.auth.signOut()
        history.push("/signin")

    }

    return (
        <nav>
            <button onClick={() => setShowingMenu(!showingMenu)} className = "fixed">
                {/* <div className="w-9 h-9 bg-gray-200 flex justify-center rounded-full">
                    <img src="https://css.gg/user.svg" alt="" />
                </div> */}

                <Icon name="user" />

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
                        className="top-0 left-0 fixed bg-gray-50 h-screen p-7 z-50 rounded-tr-3xl rounded-br-3xl justify-between overflow-auto place-content-between">

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
                                            icon: "dollar",
                                            link: "/products"
                                        },
                                        {
                                            title: "Your next class is tomorrow at 7:45",
                                            icon: "calendar-today"
                                        }
                                    ]}
                                />

                                <Section
                                    title="Quick Links"
                                    items={[
                                        {
                                            title: "Return to Homepage",
                                            icon: "home",
                                            link: "/"
                                        },
                                        {
                                            title: "Book a Class",
                                            icon: "calendar-today",
                                            link: "/book"
                                        },
                                        {
                                            title: "Purchase Bundles",
                                            icon: "shopping-cart",
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
                            onClick = {signOut} >
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
                                name={item.icon}
                                isLink={true} />
                            <p>{item.title}</p>
                        </Link>


                        :

                        <div className="flex items-center space-x-4" key={key}>
                            <Icon name={item.icon} />
                            <p>{item.title}</p>
                        </div>

                )}
            </div>

        )
    }
}

export default Header
