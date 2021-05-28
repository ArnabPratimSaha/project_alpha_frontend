import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../component/navbar/navbar';
import useMode from '../../customhooks/useMode'
import './home.css';
import lottie from "lottie-web";

export default function Home() {
    const [mode,changeMode,MODETYPE,updateMode]=useMode();
    const [value, onChange] = useState(new Date());
    const handleOnModeUpdate=()=>{
        updateMode();
    }
    const current=useRef(null);
    useEffect(()=>{
        lottie.loadAnimation({
            container: current.current, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("./main robot.json")
          });
    },[])
    return (
        <div className='home-full-div' style={{backgroundColor:mode===MODETYPE.DARK?'#444':'#cacacaca'}}>
            <Navbar onUpdateMode={handleOnModeUpdate}/>
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
            <div className='home-learn-more' style={{backgroundColor:mode===MODETYPE.DARK?'#555':'#cacaca'}}>
            </div>
        </div>
    )
}
