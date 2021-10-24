import React from 'react'
import './server.css';
import discordlogo from '../../images/discord-logo.png'
import { MdVerified,MdOutlineSupervisorAccount } from 'react-icons/md';
import { VscDebugBreakpointDataUnverified} from 'react-icons/vsc';
export default function Server(props) {
    return (
        <div className='server-fulldiv' style={{backgroundColor:props.mode===props.MODETYPE.DARK?"#cacaca":'#666'}}>
            <div className='server-image-div'>
                <img src={props.img?props.img:discordlogo}/>
            </div>
            <div className='server-info-div' style={{color:props.mode===props.MODETYPE.DARK?"#000":'#fff'}}>
                <div className='server-info-name'>
                    {props.isPartnered&&<MdVerified className='server-info-logo'/>}
                    {!props.isPartnered&&<VscDebugBreakpointDataUnverified/>}
                    <p>{props.name}</p>
                </div>
                <div className='server-info-count'>
                    <MdOutlineSupervisorAccount className='server-info-logo'/>
                    <p>{props.count}</p>
                </div>
            </div>
        </div>
    )
}