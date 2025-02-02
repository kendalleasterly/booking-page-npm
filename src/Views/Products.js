import React from 'react'
import { Link, Route, Switch } from "react-router-dom"
import Payment from './Payment'

function Products(props) {

    const account = props.account

    const productsObjects = [
        {
            title: "3 Pack",
            price: 4000,
            description: "Save $5!",
            id: "threepack"
        },
        {
            title: "4 Pack",
            price: 5000,
            description: "Save $10!",
            id: "fourpack"
        },
        {
            title: "10 Pack",
            price: 13000,
            description: "Save $20!",
            id: "tenpack"
        },
        {
            title: "Membership",
            price: 18000,
            description: "Unlimited classes for a month + one personal training session!",
            id: "membership"
        }
    ]
    return (


        <Switch>
            <Route exact path="/products">
                <div className="grid lg:grid-cols-2 gap-y-7">
                    {productsObjects.map((value, index) => <Product key={index} product={value}></Product>)}
                </div>
            </Route>

            <Route path="/products/success">
            <p className="text-center font-semibold text-xl">Your Payment has gone through, and you have successfuly added credits to your account. Thank You!</p>
            </Route>

            <Route path="/products/:id">
                <Payment
                    firestore={props.firestore}
                    account={account}
                    auth={props.auth} />
            </Route>
            
        </Switch>


    )

    function Product(props) {

        const product = props.product

        const formatPrice = function () {

            const standardPrice = product.price / 100
            const prettyPrice = `$${standardPrice}.00`
            return prettyPrice

        }

        const decideLink = function () {

            if (product.title === "Membership") {
                if (account) {
                    if (account.isMember) {

                        return (
    
                            <p className="font-bold rounded-3xl bg-gray-200 text-center text-gray-300 w-full py-1.5 mt-7"> Next</p>
    
                        )
    
                    }
                }
                
            }

            return (
                <Link to={"/products/" + product.id}>
                    <p className="font-bold rounded-3xl bg-blue-500 text-center text-white w-full py-1.5 mt-7"> Next</p>
                </Link>
            )

        }

        return (
            <div className="card w-full space-y-7">
                <div className="grid grid-cols-2">
                    <p className="text-xl font-bold">{product.title}</p>
                    <p className="text-xl text-right">{formatPrice()}</p>
                </div>

                <p className="text-gray-400">{product.description}</p>

                {decideLink()}

            </div>
        )
    }
}

export default Products
