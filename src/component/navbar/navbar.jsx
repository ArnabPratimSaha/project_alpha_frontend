import React, { useEffect, useState } from 'react'
import useMode from '../../customhooks/useMode'
import Owl from '../owlComponent/owl';
import ViviFace from '../viviFace/viviFace';
import './navbar.css'
import {LightONE,DarkONE,colorPalettes} from '../../stylesandthemes/themes';
import Cookies from 'js-cookie';

export default function Navbar(props) {
    const [mode,changeMode,MODETYPE,updateMode]=useMode();
    const [shrink,setShrink]=useState(false);
    const [loadingPercentage,setLoadingPercentage]=useState(0);
    window.addEventListener('scroll',(e)=>{
        if(window.scrollY>400)
        {
            setShrink(true);
        }
        else
        {
            setShrink(false)
        }
    })
    useEffect(()=>{
        setLoadingPercentage(props.loadingPercentage)
    },[props.loadingPercentage])
    const handleChange=()=>{
        updateMode();
        props.onUpdateMode();
    }
    const handleFocus=()=>{
        const div=document.getElementsByClassName('navbar-info-div')[0]
        if(window.innerWidth>1200)
        {
            div.style.display='none';
            return;
        }
        if(div.style.display==='block')
        {
            div.style.display='none'
        }
        else
        {
            div.style.display='block'
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
        window.location='http://localhost:5000/auth/discord'
    }
    return (
        <div>
            <div className='main-body' style={{height:shrink?'3rem':'5rem',backgroundColor:mode===MODETYPE.DARK?'#333':'#cacaca'}}>
                <div className='navbar-svg' style={{backgroundColor:mode===MODETYPE.DARK?'#333':'#cacaca'}}>
                    <ViviFace/>
                </div>
                <div className='navbar-loading-div' style={{backgroundColor:mode===MODETYPE.DARK?'#333':'#cacaca'}}>
                    <div className='navbar-loading-bar' style={{transform:`scaleX(${loadingPercentage})`}}>
                    </div>
                </div>
                <div className='navbar-links' style={{color:mode===MODETYPE.DARK?'#fff':'#222',backgroundColor:mode===MODETYPE.DARK?'#333':'#cacaca'}}>
                    <a className='navbar-links__link' href='/home' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Home
                    </a>
                    <a className='navbar-links__link' href={`/dashboard/${Cookies.get('id')}/null/${Cookies.get('discordId')}`} style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}> 
                        Dashboard
                    </a>
                    <a className='navbar-links__link' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Log
                    </a>
                    <a className='navbar-links__link' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Learn About
                    </a>
                </div>
                <div className='navbar-credentials' style={{color:mode===MODETYPE.DARK?'#fff':'#222',backgroundColor:mode===MODETYPE.DARK?'#333':'#cacaca'}}>
                    {!props.status &&<div className='navbar-login' onClick={handleLogin}>
                        <span>Log in</span>
                    </div>}
                    {props.status &&<div>
                        <div className='circle-image' >
                            <img src={props.imageSource} onClick={handleFocus}/> 
                            <span>{`${props.userName} #${props.userTag}`}</span>
                            {!props.isTemp &&<div className='navbar-logout' onClick={onLogout}>
                                <span>
                                    Log Out
                                </span>
                            </div>}
                        </div>
                        <div className='navbar-info-div' style={{backgroundColor:mode===MODETYPE.DARK?`#555`:`#cacacaca`}}>
                            <span>{`${props.userName} #${props.userTag}`}</span>
                            {!props.isTemp && <div className='navbar-logout-2' onClick={onLogout}>
                                <span>
                                    Log Out
                                </span>
                            </div>}
                        </div>
                    </div>}
                </div>
                <div className='navbar-theme-togle' >
                    <Owl onChange={handleChange}/>
                </div>
                <h1 className='navbar-brandname' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>Vivo</h1>
                <div className='navlinks-mobile' style={{top:shrink?'0':'100%',backgroundColor:mode===MODETYPE.DARK?'#555':'#ffff',color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                    <span>
                        Home
                    </span>
                    <span>
                        Dashboard
                    </span>
                    <span>
                        Messages
                    </span>
                    <span>
                        Learn About
                    </span>
                </div>
            </div>
        </div>
    )
}