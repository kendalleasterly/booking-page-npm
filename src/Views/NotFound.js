import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"

function NotFound() {

    const history = useHistory()

    useEffect(() => {
       
        history.push("/")

    }, [history])

    return (
        <p></p>
    )
}

export default NotFound
