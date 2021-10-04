import React,{useEffect} from 'react'
import './guildButton.css'

function GuildButton(props) {
    return (
        <div className='guild-button-fulldiv' onClick={()=>{props.onClick(props.id)}} style={{background:props.mode===props.MODETYPE.DARK?'#555':'#656565'}}>
            {props.avatar && <img src={props.avatar}></img>}
            {!props.avatar && <span>{props.guildName.slice(0,1).toUpperCase()}</span>}
            <h3>{props.guildName}</h3>
        </div>
    )
}
export default GuildButton