import React from 'react'

function Icon(props) {

    const getBase = function() {
        if (props.isLink) {
            return "http://icons.kendalleasterly.com/blue-500/"
        } else {
            return "https://css.gg/"
        }
    }
    
    return (
        <div className="w-9 h-9 bg-gray-200 flex rounded-full">
            <img src={`${getBase()}${props.name}.svg`} alt="" className = "w-6 h-6 mx-auto my-auto"/>
        </div>
    )
}

export default Icon
