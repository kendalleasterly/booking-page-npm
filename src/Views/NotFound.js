import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"

function NotFound() {

    const history = useHistory()

    useEffect(() => {
       
        history.push("/")

    }, [history])

    return (
        <div>
            <p className = "text-center font-semibold text-xl">404 error</p>
        </div>
    )
}

export default NotFound
