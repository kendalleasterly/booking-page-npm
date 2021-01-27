import React from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

function Home(props) {

    const [bookAnimation, setBook] = useSpring(() => ({ transform: "scale(1)" }))
    const [productsAnimation, setProducts] = useSpring(() => ({ transform: "scale(1)" }))


    return (
        <div className="left-0 top-0 flex flex-col md:flex-row h-screen">

            <div className="z-40 fixed p-4">
                {props.header}
            </div>

            <Link to="/book" className="h-1/2 md:h-screen md:w-full">
                <div
                    className="mx-auto bg-blue-600 flex h-full flex-col justify-between z-0 relative"
                    name="mx-auto bg-blue-600 h-screen flex flex-col justify-between z-0 relative"
                    onMouseEnter={() => setBook({ transform: "scale(1.25)" })}
                    onMouseLeave={() => setBook({ transform: "scale(1)" })}>

                    <p></p>

                    <animated.p style={bookAnimation} className="text-center text-white text-3xl font-bold">
                        Book a Class
                    </animated.p>

                    <p></p>

                </div>
            </Link>

            <Link to="/products" className="h-1/2 md:h-screen md:w-full">
                <div
                    className="mx-auto bg-blue-500 h-full flex flex-col justify-between z-0 relative"
                    name="mx-auto bg-blue-500 h-screen flex flex-col justify-between z-0 relative"
                    onMouseEnter={() => setProducts({ transform: "scale(1.25)" })}
                    onMouseLeave={() => setProducts({ transform: "scale(1)" })}>
                    <p></p>


                    <animated.p
                        className="text-center text-white text-3xl font-bold"
                        style={productsAnimation}>Purchase Bundles</animated.p>

                    <p></p>

                </div>
            </Link>

        </div>
    )
}

export default Home
