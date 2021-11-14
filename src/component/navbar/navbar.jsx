import React, { useEffect, useState } from 'react'
import useMode from '../../customhooks/useMode'
import Owl from '../owlComponent/owl';
import ViviFace from '../viviFace/viviFace';
import './navbar.css'
import { LightONE, DarkONE, colorPalettes } from '../../stylesandthemes/themes';
import Cookies from 'js-cookie';
import RobotHead from '../robotHead/robotHead';
import { FaDiscord } from "react-icons/fa";
import BotStatus from '../botStatus/botStaus';

export default function Navbar(props) {
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [shrink, setShrink] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [mobileSize, setMobileSize] = useState(window.innerWidth<900?true:false);
    const [status, setStatus] = useState(props.status==='true'?true:false);

    const [botStatus, setBotStatus] = useState(Cookies.get('bot-status')?false:true)
;    useEffect(() => {
        if(props.status)setStatus(true);
        else setStatus(false);
    }, [props.status])
    window.addEventListener('scroll', (e) => {
        if (window.scrollY > 400) {
            setShrink(true);
        }
        else {
            setShrink(false)
        }
    });
    useEffect(() => {
        window.addEventListener('resize',()=>{
            if(window.innerWidth>900){
                setIsWindowOpen(false);
                setMobileSize(false);
            }
            else
                setMobileSize(true);
        })
    }, [])
    useEffect(()=>{
        setLoadingPercentage(props.loadingPercentage)
    },[props.loadingPercentage])
    const handleChange=()=>{
        updateMode();
        props.onUpdateMode();
    }
    const handleFocus=()=>{
        if (window.innerWidth < 900) {
            setIsWindowOpen((s) => !s);
        }
    }
    const onLogout=()=>{
        setLoadingPercentage(.3);
        setTimeout(() => {
            setLoadingPercentage(1);
            setTimeout(() => {
                props.handleLogout();
                setLoadingPercentage(0);
            }, 300);
        }, 1000);
    }
    const handleLogin=()=>{
        window.location=`${process.env.REACT_APP_BACKENDAPI}auth/discord`
    }
    useEffect(() => {
        if (!Cookies.get('bot-status')) {
            Cookies.set('bot-status', 'done');
            setBotStatus(true);
        }
    }, [])
    return (
        <div className='navbar-fulldiv'>
            <div className='main-body' style={{height:shrink?'3.5rem':'5rem',backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                <div className='navbar-overlay' style={{backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}></div>
                <div className='navbar-svg' style={{backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    <RobotHead/>
                </div>
                {mobileSize&&<h1 className='navbar-brandname' style={{backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8',color:mode===MODETYPE.DARK?'#fff':'#222'}}>Vivo</h1>}
                <div className='navbar-loading-div' style={{backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    <div className='navbar-loading-bar' style={{transform:`scaleX(${loadingPercentage})`}}>
                    </div>
                </div>
                <div className='navbar-links' style={{color:mode===MODETYPE.DARK?'#fff':'#222',backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    <a className='navbar-links__link' href={props.page!='home'?'/home':'#'} style={{color:props.page==='home'?'#007ca5':mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Home
                    </a>
                    <a className='navbar-links__link' href={props.page!='dashboard'?status?`/dashboard/${Cookies.get('temp_id')?Cookies.get('temp_id'):Cookies.get('id')}/${Cookies.get('temp_discordId')?Cookies.get('temp_discordId'):Cookies.get('discordId')}`:'#':'#'} style={{color:props.page==='dashboard'?'#007ca5':mode===MODETYPE.DARK?status?'#fff':'#666':status?'#222':'#555'}}> 
                        Dashboard
                    </a>
                    <a className='navbar-links__link' href={props.page!='log'?status?`/log/${Cookies.get('temp_id')?Cookies.get('temp_id'):Cookies.get('id')}/${Cookies.get('temp_discordId')?Cookies.get('temp_discordId'):Cookies.get('discordId')}`:'#':'#'} style={{color:props.page==='log'?'#007ca5':mode===MODETYPE.DARK?status?'#fff':'#666':status?'#222':'#555'}}>
                        Log
                    </a>
                    <a className='navbar-links__link' style={{color:props.page==='learn'?'#007ca5':mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Learn About
                    </a>
                </div>
                <div className='navbar-credentials' style={{color:mode===MODETYPE.DARK?'#fff':'#222',backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    {!props.status && <button className='navbar-login' onClick={handleLogin}>Log in</button>}
                    {props.status &&<div className='navbar-loggedin-div'>
                        <div className='circle-image' >
                            <div className='circle-image__image'>
                                <img src={props.imageSource} onClick={handleFocus} />
                                {Cookies.get('temp_id')&&<FaDiscord className='temp-user-discord-logo'/>}
                            </div>
                            {!mobileSize&&<span>{`${props.userName} #${props.userTag}`}</span>}
                        </div>
                        {!mobileSize&&<button className='navbar-logout' onClick={onLogout}>Log Out</button>}
                        {isWindowOpen&&<div className='navbar-small-window' style={{ backgroundColor: mode === MODETYPE.DARK ? '#000' : '#444' }}>
                            <span >{`${props.userName} #${props.userTag}`}</span>
                            <button className='navbar-logout' onClick={onLogout}>Log Out</button>
                        </div>}
                    </div>}
                    <div className='navbar-theme-togle' >
                        <Owl onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className='navlinks-mobile' style={{ height: shrink ? '0' : '2rem', backgroundColor: mode === MODETYPE.DARK ? '#555' : '#ffff', color: mode === MODETYPE.DARK ? '#fff' : '#222', }}>
                <a style={{ color: props.page === 'home' ? '#007ca5' : mode === MODETYPE.DARK ? status ? '#fff' : '#666' : status ? '#222' : '#555' }} href={props.page != 'home' ? '/home' : '#'} className='navbar-links__link'>
                    Home
                </a>
                <a style={{ color: props.page === 'dashboard' ? '#007ca5' : mode === MODETYPE.DARK ? status ? '#fff' : '#666' : status ? '#222' : '#555' }} className='navbar-links__link' href={props.page != 'dashboard' ? status ? `/dashboard/${Cookies.get('temp_id') ? Cookies.get('temp_id') : Cookies.get('id')}/${Cookies.get('temp_discordId') ? Cookies.get('temp_discordId') : Cookies.get('discordId')}` : '#' : '#'}>
                    Dashboard
                </a>
                <a style={{ color: props.page === 'log' ? '#007ca5' : mode === MODETYPE.DARK ? status ? '#fff' : '#666' : status ? '#222' : '#555' }} href={props.page != 'log' ? status ? `/log/${Cookies.get('temp_id') ? Cookies.get('temp_id') : Cookies.get('id')}/${Cookies.get('temp_discordId') ? Cookies.get('temp_discordId') : Cookies.get('discordId')}` : '#' : '#'} className='navbar-links__link'>
                    Log
                </a>
                <a style={{ color: props.page === 'learn' ? '#007ca5' : mode === MODETYPE.DARK ? '#fff' : '#222' }} className='navbar-links__link'>
                    Learn About
                </a>
            </div>
            {botStatus&&<BotStatus mode={mode} MODETYPE={MODETYPE}/>}
        </div>
    )
}