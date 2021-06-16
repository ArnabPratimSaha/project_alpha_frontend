import React from 'react'
import './userCard.css'
import { BsXCircleFill } from "react-icons/bs";
function UserCard() {
    return (
        <div className='usercard-fulldiv'>
            <div className='usercard-imagediv'>
                <img src='https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg'></img>
            </div>
            <div className='usercard-namediv'>
                AR30M#2440
            </div>
            <div className='usercard-closeDiv'>
                <BsXCircleFill/>
            </div>
        </div>
    )
}

export default UserCard
