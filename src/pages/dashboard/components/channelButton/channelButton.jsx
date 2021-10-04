import React, { useState } from 'react'
import './channelButton.css'
import { AiFillPlusSquare } from 'react-icons/ai';

function ChannelButton(props) {
    const [hovered,setHovered]=useState(false);
    return (
        <div className='channelbutton-fulldiv' style={{backgroundColor:'#444',color:'#fff',...props.style}}>
            <h2>{props.name}</h2>
            <AiFillPlusSquare onClick={()=>{props.onClick(props.id)}} onMouseEnter={()=>{setHovered(true)}} onMouseLeave={()=>{setHovered(false)}} style={{color:hovered?'#666':'white',cursor:'pointer',...props.style}}/>
        </div>
    )
}

export default ChannelButton
