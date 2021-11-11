import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import Modal from "../../component/modal/modal";
import useMode from "../../customhooks/useMode";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Cookie from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import './validation.css';

const Validation=(props)=> {
    const { did, sid, page } = useParams();
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    const [isModalOn, setIsModalOn] = useState(false);
    const [modalText, setModalText] = useState('');
    const data = useRef(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKENDAPI}link/check?did=${did}&sid=${sid}`).then((res) => {
            if (res.status === 200) {
                data.current = res.data;
                axios.get(`${process.env.REACT_APP_BACKENDAPI}link/sendcode?id=${did}&en=${sid}`).then((response) => {
                    setIsModalOn(true);
                    setModalText('OTP is sent on your discord');
                }).catch(err => {
                    
                })
            }
        }).catch(e => {
            window.location='/error/405';
        })
    }, [])
    const handleModalClick = (v) => {
        axios.get(`${process.env.REACT_APP_BACKENDAPI}link/validate?id=${did}&en=${sid}&c=${v}`).then((res) => {
            if (res.status === 200) {
                Cookie.set('temp_id', data.current.userId);
                Cookie.set('temp_discordId', data.current.discordId);
                Cookie.set('temp_userName', data.current.userName);
                Cookie.set('temp_userTag', data.current.userTag);
                Cookie.set('temp_avatar', data.current.avatar)
                if (page === 'dashboard') window.location = `/dashboard/${data.current.userId}/${did}`;
                if (page === 'log') window.location = `log/${data.current.userId}/${did}`;
            }
        }).catch((e)=>{
            
        })
    }
        return(
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
                style={{ fontSize: ".7rem" }}
                />
            <div className='validation-fulldiv' style={{ backgroundColor: mode === MODETYPE.DARK ? "#444" : "#cacacaca", }}>
                <Modal isOpen={isModalOn} onClick={handleModalClick} text={modalText} mode={mode} MODETYPE={MODETYPE} />
            </div>
        </div>
    )
}

export default Validation;
