import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"

function NotFound() {

    const history = useHistory()

    useEffect(() => {
       
        history.push("/")

    }, [history])

    return (
        <div>
            <p>We still haven't found any reason why you decided to do a 404</p>
        </div>
    )
}

export default NotFound
