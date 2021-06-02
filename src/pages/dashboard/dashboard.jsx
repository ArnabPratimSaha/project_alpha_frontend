import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Navbar from '../../component/navbar/navbar';
import useMode from '../../customhooks/useMode';
import './dashboard.css'
import { MdArrowDropDownCircle } from "react-icons/md";

import DateTimePicker from 'react-datetime-picker';
var maxDate = new Date();
var numberOfDaysToAdd = 6;
maxDate.setDate(maxDate.getDate() + numberOfDaysToAdd);

var minDate = new Date();
minDate.setDate(minDate.getDate() - 1);

function Dashboard() {
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    const [value, onChange] = useState(new Date());
    const [rightDivPosition, changeRightDivPosition] = useState(window.innerWidth > 900 ? 60 : 100);
    const [isRightDivSliderButtonClicked, changeIsRightDivSliderButtonClicked] = useState(false);
    let { uid, sid } = useParams();
    const handleOnModeUpdate = () => {
        updateMode();
    }
    useEffect(() => {
        window.addEventListener('resize', () => {
            changeIsRightDivSliderButtonClicked(false);
            window.innerWidth > 900 ? changeRightDivPosition(60) : changeRightDivPosition(100);
        })
    }, []);
    const onTextareaChange = event => {
        const textArea = document.getElementsByName("messagearea")[0];
        // textArea.style.height = (textArea.value.split(/\r*\n/).length) * 1.5.toLocaleString() + "rem";
    }
    const onTextareaFocus = (e) => {
        if (e.target.name === 'messagearea') {
            const div = document.getElementsByClassName('dashboard-message-input-wrapper')[0];
            div.style.boxShadow = '5px 5px 6px #444';
            div.style.backgroundColor = (mode === MODETYPE.DARK) ? '#777' : '#e6e6e6'
            div.style.border = '3px solid #fff'
        }
        if (e.target.name === 'messagetitle') {
            const div = document.getElementsByClassName('dashboard-message-div__info')[0];
            div.style.boxShadow = '5px 5px 6px #444';
            div.style.backgroundColor = (mode === MODETYPE.DARK) ? '#777' : '#e6e6e6'
            div.style.border = '3px solid #fff'
        }
    }
    const handleBlur = (e) => {
        if (e.target.name === 'messagearea') {
            const div = document.getElementsByClassName('dashboard-message-input-wrapper')[0];
            div.style.boxShadow = 'none';
            div.style.border = '1px solid #000'
            div.style.backgroundColor = "transparent"
        }
        if (e.target.name === 'messagetitle') {
            const div = document.getElementsByClassName('dashboard-message-div__info')[0];
            div.style.boxShadow = 'none';
            div.style.backgroundColor = "transparent"
            div.style.border = '1px solid #000'
        }
    }
    const handleTogglerClick = () => {
        changeIsRightDivSliderButtonClicked(!isRightDivSliderButtonClicked);
        !isRightDivSliderButtonClicked ? changeRightDivPosition(40) : changeRightDivPosition(100);
    }
    const handleTabButtonClick = (e) => {
        const messageDiv = document.getElementsByClassName('dashboard-message-div')[0];
        const memberDiv = document.getElementsByClassName('dashboard-memberselect-div')[0];
        const roleDiv = document.getElementsByClassName('dashboard-roleselect-div')[0];
        if (e.target.name === 'message') {
            messageDiv.style.zIndex = '2';
            memberDiv.style.zIndex = '1';
            roleDiv.style.zIndex = '1';
            document.getElementsByClassName('dashboard-button-div__message')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#a6a6a6' : '#e6e6e6'
            document.getElementsByClassName('dashboard-button-div__members')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#737373' : '#e6e6e6'
            document.getElementsByClassName('dashboard-button-div__rolesandchannels')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#737373' : '#e6e6e6'
        }
        else if (e.target.name === 'members') {
            messageDiv.style.zIndex = '1';
            memberDiv.style.zIndex = '2';
            roleDiv.style.zIndex = '1';
            document.getElementsByClassName('dashboard-button-div__message')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#737373' : '#e6e6e6'
            document.getElementsByClassName('dashboard-button-div__members')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#a6a6a6' : '#e6e6e6'
            document.getElementsByClassName('dashboard-button-div__rolesandchannels')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#737373' : '#e6e6e6'
        }
        else {
            messageDiv.style.zIndex = '1';
            memberDiv.style.zIndex = '1';
            roleDiv.style.zIndex = '2';
            document.getElementsByClassName('dashboard-button-div__message')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#737373' : '#e6e6e6'
            document.getElementsByClassName('dashboard-button-div__members')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#737373' : '#e6e6e6'
            document.getElementsByClassName('dashboard-button-div__rolesandchannels')[0].style.backgroundColor = mode === MODETYPE.DARK ? '#a6a6a6' : '#e6e6e6'
        }
    }
    return (
        <>
            <Navbar onUpdateMode={handleOnModeUpdate} />
            <div className='dashboard-full-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#444' : '#cacacaca' }}>
                <div className='dashboard-content-div'>
                    <div className='dashboard-toggle-button'>
                        <MdArrowDropDownCircle className="dashboard-toggle-button__icon" onClick={handleTogglerClick} style={{ transform: `translateY(-50%) rotateZ(${isRightDivSliderButtonClicked ? `-90deg` : `90deg`})` }} />
                    </div>
                    <div className='dashboard-left-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                        <div className='dashboard-button-div'>
                            <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                <p>members & roles</p>
                            </div>
                            <button type='button' name='message' className="dashboard-button-div__message" onClick={handleTabButtonClick}>message</button>
                            <button type='button' name='members' className="dashboard-button-div__members" onClick={handleTabButtonClick} >members</button>
                            <button type='button' name='rolesandchannels' className="dashboard-button-div__rolesandchannels" onClick={handleTabButtonClick} >roles & channels</button>
                        </div>
                        <div className='dashboard-message-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                            <div className='dashboard-message-div__info'>
                                <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                    <p>message title</p>
                                </div>
                                <input type='text' name='messagetitle' onFocus={onTextareaFocus} onBlur={handleBlur}></input>
                            </div>
                            <div className='dashboard-message-input-wrapper'>
                                <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                    <p>message body</p>
                                </div>
                                <textarea name='messagearea' onChange={onTextareaChange} onFocus={onTextareaFocus} onBlur={handleBlur}></textarea>
                            </div>
                            <div className='dashboard-message-datetime-picker'>
                                <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                    <p>Date & Time Picker</p>
                                </div>
                                <DateTimePicker
                                    onChange={onChange}
                                    value={value}
                                    disableClock='true'
                                    maxDate={maxDate}
                                    minDate={minDate}
                                    format='dd-MM-y h:mm:ss a'
                                    className='dashboard-message-datetime-picker__datepicker'
                                />
                            </div>
                            <div className='dashboard-message-send-div'>
                                <span>send</span>
                            </div>
                        </div>
                        <div className='dashboard-memberselect-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                            <div className='dashboard-memberselect-div__search-div'>
                                <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                    <p>search</p>
                                </div>
                            </div>
                            <div className='dashboard-memberselect-div__result-div'>
                                <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                    <p>result</p>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-roleselect-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                            <div className='dashboard-roleselect-div__search-div'>
                                <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                    <p>search</p>
                                </div>
                            </div>
                            <div className='dashboard-roleselect-div__result-div'>
                                <div className='dashboard-label' style={{ backgroundColor: mode === MODETYPE.DARK ? '#666' : '#f2f2f2' }}>
                                    <p>result</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-right-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#777' : '#cacaca', left: rightDivPosition.toString() + '%' }}>
                        <div className='dashboard-right-div__membercount'>

                        </div>
                        <div className='dashboard-right-div__rolecount'>

                        </div>
                        <div className='dashboard-right-div__'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
