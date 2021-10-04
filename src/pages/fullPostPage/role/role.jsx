import React from 'react'
import './role.css';

function Role(props) {
    return (
        <div style={{backgroundColor:props.mode===props.MODETYPE.DARK?'#fff':'#cacaca'}} className='role-view-fulldiv'>
            {props.isAdmin&&<div className='role-admin-div'>
                <span>A</span>
            </div>}
            {!props.name&&<p style={{color:'#333'}} className='role-deleted-role'>deleted role</p>}
            {props.name&&<p style={{color:'#333'}} className='role-role-name'>{props.name}</p>}
        </div>
    )
}

export default Role