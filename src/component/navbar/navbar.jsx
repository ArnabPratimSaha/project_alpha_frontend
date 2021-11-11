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
        window.location=`${process.env.REACT_APP_BACKENDAPI}auth/discord`
    }
    return (
        <div>
            <div className='main-body' style={{height:shrink?'3rem':'5rem',backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                <div className='navbar-svg' style={{backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    <ViviFace/>
                </div>
                <div className='navbar-loading-div' style={{backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    <div className='navbar-loading-bar' style={{transform:`scaleX(${loadingPercentage})`}}>
                    </div>
                </div>
                <div className='navbar-links' style={{color:mode===MODETYPE.DARK?'#fff':'#222',backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    <a className='navbar-links__link' href='/home' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Home
                    </a>
                    <a className='navbar-links__link' href={`/dashboard/${Cookies.get('temp_id')?Cookies.get('temp_id'):Cookies.get('id')}/${Cookies.get('temp_discordId')?Cookies.get('temp_discordId'):Cookies.get('discordId')}`} style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}> 
                        Dashboard
                    </a>
                    <a className='navbar-links__link' href={`/log/${Cookies.get('temp_id')?Cookies.get('temp_id'):Cookies.get('id')}/${Cookies.get('temp_discordId')?Cookies.get('temp_discordId'):Cookies.get('discordId')}`} style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Log
                    </a>
                    <a className='navbar-links__link' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                        Learn About
                    </a>
                </div>
                <div className='navbar-credentials' style={{color:mode===MODETYPE.DARK?'#fff':'#222',backgroundColor:mode===MODETYPE.DARK?'#222':'#a8a8a8'}}>
                    {!props.status &&<div className='navbar-login' onClick={handleLogin}>
                        <span>Log in</span>
                    </div>}
                    {props.status &&<div className='navbar-loggedin-div'>
                        <div className='circle-image' >
                            <img src={props.imageSource} onClick={handleFocus}/> 
                            <span>{`${props.userName} #${props.userTag}`}</span>
                        </div>
                        {!props.isTemp &&<div className='navbar-logout' onClick={onLogout}>
                            <span>
                                Log Out
                            </span>
                        </div>}
                        {/* <div className='navbar-info-div' style={{backgroundColor:mode===MODETYPE.DARK?`#555`:`#cacacaca`}}>
                            <span>{`${props.userName} #${props.userTag}`}</span>
                            {!props.isTemp && <div className='navbar-logout-2' onClick={onLogout}>
                                <span>
                                    Log Out
                                </span>
                            </div>}
                        </div> */}
                    </div>}
                </div>
                <div className='navbar-theme-togle' >
                    <Owl onChange={handleChange}/>
                </div>
                <h1 className='navbar-brandname' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>Vivo</h1>
                <div className='navlinks-mobile' style={{top:shrink?'0':'100%',backgroundColor:mode===MODETYPE.DARK?'#555':'#ffff',color:mode===MODETYPE.DARK?'#fff':'#222',}}>
                    <a style={{color:mode===MODETYPE.DARK?'#fff':'#222',}} href='/home' className='navbar-links__link'>
                        Home
                    </a>
                    <a style={{color:mode===MODETYPE.DARK?'#fff':'#222',}} className='navbar-links__link' href={`/dashboard/${Cookies.get('id')}/null/${Cookies.get('discordId')}`}>
                        Dashboard
                    </a>
                    <a style={{color:mode===MODETYPE.DARK?'#fff':'#222',}} href={`/log/${Cookies.get('id')}/null/${Cookies.get('discordId')}`} className='navbar-links__link'>
                        Log
                    </a>
                    <a style={{color:mode===MODETYPE.DARK?'#fff':'#222',}} className='navbar-links__link'>
                        Learn About
                    </a>
                </div>
            </div>
        </div>
    )
}