import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../component/navbar/navbar";
import useMode from "../../customhooks/useMode";
import Cookies from "js-cookie";
import axios from 'axios'
import './postPage.css';
import Timecard from "./timeCard/timeCard";
import MemberButton from "./memberButton/memberButton";
import Role from "./role/role";
const messageStatus={
    PROCESSING:'PROCESSING',
    CANCELLED:'CANCELLED',
    SENT:'SENT',
}
const messageType={
    channel:'CHANNEL',
    dm:'DM'
  }
function PostPage(props) {
    let { uid,sid, did,pid} = useParams();
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    const [details, setDetails] = useState()
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
    const [remainingTime, setRemainingTime] = useState(new Date(Date.parse(props.time))-new Date())
    const [remainingTimeString, setRemainingTimeString] = useState('')

    const [ticking, setTicking] = useState(0)
    const timer = useRef(null)
    useEffect(() => {
        if(details && details.status===messageStatus.PROCESSING)
        {
            setRemainingTime(new Date(Date.parse(details.time)).getTime() - new Date().getTime())
        }
    }, [ticking])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKENDAPI}log?did=${did}&mid=${pid}`).then((res) => {
            const response=res.data;
            setDetails(res.data)
            if (response.status === messageStatus.PROCESSING) {
                if (response.time) {
                    setRemainingTime(new Date(Date.parse(response.time)).getTime() - new Date().getTime())
                }
                timer.current = setInterval(() => {
                    setTicking((s) => s + 1)
                }, 1000);
            }
        }).catch((error)=>{
            
        })
        return () => {
            clearInterval(timer.current)
        }
    },[])
    useEffect(() => {
        if (details && details.status === messageStatus.PROCESSING) {
            if (remainingTime >= 0) {

                let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let mins = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                let secs = Math.floor((remainingTime % (1000 * 60)) / 1000);
                setRemainingTimeString(`${days}D ${hours}H ${mins}MM ${secs}S`)
            }
        }
    }, [remainingTime])
    useEffect(() => {
        if(details)
        {
            const date=new Date(details.time)
            console.log(date.toLocaleTimeString());
        }
    }, [details])
    return (
        <div>
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
            <div className='postpage-fulldiv' style={{backgroundColor:mode===MODETYPE.DARK?'#555':'#ffffff'}}>
                <div className='postpage-heading-div' style={{color:mode===MODETYPE.DARK?'#fff':'#000'}}>
                    {details&&<h1>{details.title}</h1>}
                </div>
                <div className='postpage-content-div' style={{color:mode===MODETYPE.DARK?'#cacaca':'#444'}}>
                    {details&&<p>{details.message}</p>}
                    {details &&<div className='contentdiv-details'>
                        <div className='details-discord-div'>
                            {details.avater&&<img src={details.avater}/>}
                            <h2>{details.guildName}</h2>
                        </div>
                        <div className='details-message-info-div'>
                            {details.status===messageStatus.SENT&&<Timecard data={'Message Sent On'} time={`${new Date(details.time).toDateString()} ${new Date(details.time).toLocaleTimeString()}`}/>}
                            {details.status===messageStatus.CANCELLED&&<Timecard data={'cancelled'}/>}
                            {details.status===messageStatus.PROCESSING&&<Timecard data={'Will Be Deliver By'} time={remainingTimeString}/>}
                        </div>
                    </div>}
                </div>
                {details&&<div className='postpage-posttype-div'>
                    {details.type===messageType.channel&&<div className='postpage-role-div'>
                        <h2 style={{color:mode===MODETYPE.DARK?'#fff':'#333'}}>Mentioned Roles</h2>
                        <div className='postpage-tagged-role-div'>
                            {details.roles.map((r,i)=><Role isAdmin={r.isAdmin} name={r.roleName} mode={mode} MODETYPE={MODETYPE}/>)}
                        </div>
                    </div>}
                    {details.type===messageType.channel&&<div className='postpage-channel-div'>
                        <h2 style={{color:mode===MODETYPE.DARK?'#fff':'#333'}}>Mentioned Channels</h2>
                        <div className='postpage-tagged-channel-div'>
                            {details.channels.map((c,i)=><Role isAdmin={false} name={c} mode={mode} MODETYPE={MODETYPE}/>)}
                        </div>
                    </div>}
                    {details.members&&details.members.length>0&&<div className='postpage-user-div'>
                        <h2 style={{color:mode===MODETYPE.DARK?'#fff':'#333'}}>{details.type===messageType.dm?'Users':'Mentioned Users'}</h2>
                        <div className='postpage-tagged-user-div'>
                            {details.members.map((c,i)=><MemberButton mode={mode} MODETYPE={MODETYPE} userName={c.userName} avater={c.avater} userTag={c.userTag} key={i}/>)}
                        </div>
                    </div>}
                </div>}
            </div>
        </div>
    )
}

export default PostPage
