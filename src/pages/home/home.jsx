import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../component/navbar/navbar';
import useMode from '../../customhooks/useMode'
import './home.css';
import lottie from "lottie-web";
import Cookies from 'js-cookie';
export default function Home() {
    const [mode,changeMode,MODETYPE,updateMode]=useMode();
    const [status,setStatus]=useState(false);//logged in
    const [imageSource,setImageSource]=useState(null);
    const [userName,setUserName]=useState(null);
    const [userTag,setUserTag]=useState(null);
    useEffect(()=>{
        const userId=Cookies.get('id')
        if(userId)
        {
            setStatus(true);
        }
        else
            setStatus(false)
    },[])
    useEffect(()=>{
        if(Cookies.get('id'))
        {
            setImageSource(Cookies.get('avatar'))
            setUserName(Cookies.get('userName'))
            setUserTag(Cookies.get('userTag'))
        }
    },[status])
    const handleOnModeUpdate=()=>{
        updateMode();
    }
    const current=useRef(null);
    useEffect(()=>{
        lottie.loadAnimation({
            container: current.current, 
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("./main robot.json")
          });
    },[])
    const handleLogout=()=>{
        setStatus((status)=>!status)
        Cookies.remove('id')
        Cookies.remove('userName')
        Cookies.remove('userTag')
        Cookies.remove('avatar')
    }
    return (
        <div className='home-full-div' style={{backgroundColor:mode===MODETYPE.DARK?'#444':'#cacacaca'}}>
            <Navbar onUpdateMode={handleOnModeUpdate} userName={userName} userTag={userTag} imageSource={imageSource} status={status} handleLogout={handleLogout}/>
            <div className='home-intro' >
                <div className='home-intro__title' style={{color:mode===MODETYPE.DARK?'#fff':'#233'}}>
                    <h1>Let Vivi handle your anouncement's</h1>
                    <h2>forget about forgetting</h2>
                </div>
                <div className='bot-div' ref={current}>
                </div>
                <div className='home-intro__add-div' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                    <h1>add vivi to your discord server today</h1>
                    <span style={{borderColor:mode===MODETYPE.DARK?'#fff':'#000',color:mode===MODETYPE.DARK?'#fff':'#222'}}>add vivi</span>
                    <span style={{borderColor:mode===MODETYPE.DARK?'#fff':'#000',color:mode===MODETYPE.DARK?'#fff':'#222'}}>learn more</span>
                </div>
            </div>
            <div className='used-discord-div'>

            </div>
            <div className='home-learn-more' style={{backgroundColor:mode===MODETYPE.DARK?'#555':'#cacaca'}}>
            </div>
        </div>
    )
}
