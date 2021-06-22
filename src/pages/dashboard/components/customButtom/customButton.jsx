import React from 'react'
import './customButton.css'
import ErrorComponent from '../../../../component/errorComponent/errorComponent'

function CustomButton(props) {
    return (
        <div className={props.className} onClick={()=>{props.onClick(props.id)}}  style={props.style}>
                {props.count && <div className='custom-button-count-div'>{props.count}</div>}
                {props.error===true && <div className='custom-button-error'><ErrorComponent/></div>}
              {props.children}
        </div>
    )
}

export default CustomButton
