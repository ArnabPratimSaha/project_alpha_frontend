import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../component/navbar/navbar';
import useMode from '../../customhooks/useMode'
import './home.css';
import lottie from "lottie-web";
import Cookies from 'js-cookie';
import channelImage from './images/image.png'
import Brightup from '../../component/brightup/brightup';
import Server from './components/discordserver/server';
import axios from 'axios'
export default function Home() {
    const [mode,changeMode,MODETYPE,updateMode]=useMode();
    const [status,setStatus]=useState(false);//logged in
    const [imageSource,setImageSource]=useState(null);
    const [userName,setUserName]=useState(null);
    const [userTag,setUserTag]=useState(null);
    const [serverInfo, setServerInfo] = useState([])
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
    useEffect(() => {
        axios.get('http://localhost:5000/info?c=5').then((res)=>{
            setServerInfo(res.data);
        }).catch((error)=>{})
    }, [])
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
            <div className='bot-server-used-div' style={{backgroundColor:mode===MODETYPE.DARK?'#272934':'#cacaca'}}>
                <Brightup type='Y' direction='-'>
                    <h1 style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>{`VIVI is popular among ${serverInfo && serverInfo.length} servers`}</h1>
                </Brightup>
                <div className='bot-server-used'>
                    {serverInfo.map((i,index)=><Brightup type='Y' direction='+' delay={400*index}><Server mode={mode} MODETYPE={MODETYPE} count={i.memberCount} name={i.name} img={i.avater} isPartnered={i.isPartnered}/></Brightup>)}
                </div>
            </div>
            <div className='bot-info-div'>
                <div className='bot-info-send-channel-info'>
                    <div className='send-channel-info__image'>
                        <img src={channelImage}/>
                    </div>
                    <div className='send-channel-info__text'>
                        <h1 style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>Send schedule message to your discord server at any time</h1>
                    </div>
                </div>
                <div className='bot-info-send-dm-info'>
                    <div className='send-dm-info__text'>
                        <h1 style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>Send schedule message to your discord server at any time</h1>
                    </div>
                    <div className='send-dm-info__image'>
                        <img src={channelImage}/>
                    </div>
                </div>
                <div className='bot-info-log'>
                    <div className='bot-info-log__image'>
                        <img src={channelImage}/>
                    </div>
                    <div className='bot-info-log__text'>
                        <h1 style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>Send schedule message to your discord server at any time</h1>
                    </div>
                </div>
            </div>
            <div className='home-learn-more' style={{backgroundColor:mode===MODETYPE.DARK?'#555':'#cacaca'}}>
            </div>
        </div>
    )
}
