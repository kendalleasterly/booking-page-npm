import React from 'react'
import {Link} from "react-router-dom"

function BackButton(props) {
    return (
            <Link to = {props.to}>
            <p className="gg-chevron-left text-blue-500"></p>
            </Link>
    )
}

export default BackButton
