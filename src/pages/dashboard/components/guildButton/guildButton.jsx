import React from 'react'
import './guildButton.css'

function GuildButton(props) {
    return (
        <div className='guild-button-fulldiv' onClick={()=>{props.onClick(props.id)}} style={{background:props.backgroundColor}}>
            <img src={props.avatar}></img>
            <h3>{props.guildName}</h3>
        </div>
    )
}
export default GuildButton
