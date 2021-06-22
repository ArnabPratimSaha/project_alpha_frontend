import React from 'react'
import './errorComponent.css'
import { RiErrorWarningFill } from 'react-icons/ri';
function ErrorComponent(props) {
    return (
        <div className='error-component-fulldiv' style={{fontSize:'1rem',color:'red',...props.style}}>
            <RiErrorWarningFill/>
        </div>
    )
}

export default ErrorComponent
