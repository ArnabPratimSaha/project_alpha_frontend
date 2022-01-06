import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './botStatus.css';
import { AiOutlineClose } from 'react-icons/ai';
function BotStatus({botStatus,onClose}) {
    const [state, setState] = useState(false);
    const [message, setMessage] = useState('loading...');
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios.get(`${process.env.REACT_APP_BACKENDAPI}info/botstatus`,{cancelToken:source.token}).then(res => {
            if (res.status === 200) {
                if(  (res.data.state==='crashed' || res.data.state==='down'|| res.data.state==='failed'))
                {
                    setMessage('Our discord bot seems to be down for this moment.Sorry for this inconvenient.We will resolve this issue as soon as possible.')
                    setState(true);
                }
            }
        }).catch(err => {

        });
        return ()=>source.cancel('component unmounted');
    }, [])
    return (
        <div style={{ height: state ? '3rem' : '0'}}  className='botstatus-fulldiv' >
            <p>{message}</p>
            <AiOutlineClose className='botstatus-icon' onClick={()=>{setState(false);onClose && onClose()}}/>
        </div>
    )
}

export default BotStatus
