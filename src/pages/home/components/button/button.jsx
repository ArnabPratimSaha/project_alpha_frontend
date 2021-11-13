import React from 'react'
import './button.css';
function Button(props) {
    return (
        <button className='button-component' onClick={()=>props.onClick&&props.onClick()} style={{backgroundColor:'#00bfff',...props.style}}>{props.name?props.name:'Button'}</button>
    )
}

export default Button
