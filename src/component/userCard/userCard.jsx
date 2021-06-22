import React from 'react'
import './userCard.css'
import { BsXCircleFill } from "react-icons/bs";
function UserCard(props) {
    return (
        <div className={`usercard-fulldiv ${props.classNameFullDiv}`}>
            {props.img &&<img src={props.img}></img>}
            <p style={{...props.style}}>{props.title} <BsXCircleFill onClick={()=>{props.onClick(props.id)}} className={`usercard-closeDiv ${props.classNameIcon}`} style={{...props.logoStyle}} /></p>
        </div>
    )
}

export default UserCard
