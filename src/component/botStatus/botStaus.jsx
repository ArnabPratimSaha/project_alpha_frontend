import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './botStatus.css';
import { AiOutlineClose } from 'react-icons/ai';
function BotStatus(props) {
    const [state, setState] = useState(false);
    const [message, setMessage] = useState('loading...');
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKENDAPI}info/botstatus`).then(res => {
            if (res.status === 200) {
                if(res.data.state==='crashed' || res.data.state==='down'|| res.data.state==='failed')
                {
                    setMessage('Our discord bot seems to be down for this moment.Sorry for this inconvenient.We will resolve this issue as soon as possible.')
                    setState(true);
                }
            }
        }).catch(err => {

        });
    }, [])
    return (
        <div style={{ height: state ? '3rem' : '0'}} className='botstatus-fulldiv'>
            <p>{message}</p>
            <AiOutlineClose className='botstatus-icon' onClick={()=>{setState(false);if(props.onClose)props.onClose()}}/>
        </div>
    )
}

export default BotStatus
