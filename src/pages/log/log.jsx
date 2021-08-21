import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../component/navbar/navbar";
import useMode from "../../customhooks/useMode";
import './log.css';
import Cookies from "js-cookie";
import axios from 'axios'
import Bar from '../../component/expandBar/bar';
import Switch from "../../component/switch/switch";

var newDate = new Date();
var numberOfDaysToAdd = 1;
newDate.setDate(newDate.getDate() + numberOfDaysToAdd);
function Log(props) {
    let { uid, sid, did } = useParams();
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    const [imageSource, setImageSource] = useState(
        sid === "null" && Cookies.get("avatar") ? Cookies.get("avatar") : null
    );
    const [userName, setUserName] = useState(
        sid === "null" && Cookies.get("userName") ? Cookies.get("userName") : false
    );
    const [userTag, setUserTag] = useState(
        sid === "null" && Cookies.get("userTag") ? Cookies.get("userTag") : false
    );
    const [status, setStatus] = useState(
        sid === "null" && Cookies.get("id") ? true : false
    ); //logged in
    const [isTemp, setIsTemp] = useState(
        sid === "null" && Cookies.get("id") ? false : true
    ); //logged in
    const handleLogout = () => {
        setStatus((status) => !status);
        Cookies.remove("id");
        Cookies.remove("userName");
        Cookies.remove("userTag");
        Cookies.remove("avatar");
    };
    const handleOnModeUpdate = () => {
        updateMode();
    };
    return (
        <>
            <Navbar
                onUpdateMode={handleOnModeUpdate}
                userName={userName}
                userTag={userTag}
                imageSource={imageSource}
                status={status}
                handleLogout={handleLogout}
                isTemp={isTemp}
                loadingPercentage={loadingPercentage}
            />
            <div style={{paddingTop:'10rem'}}></div>
            <div style={{width:"100%",display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Bar mode={mode} MODETYPE={MODETYPE} status='CANCEL' />
            <Bar mode={mode} MODETYPE={MODETYPE} status='DONE'/>
            <Bar mode={mode} MODETYPE={MODETYPE} status='ONGOING' time={newDate} />
            <Switch onChange={(c)=>{console.log(c);}}/>
            </div>
            
        </>
    )
}

export default Log
