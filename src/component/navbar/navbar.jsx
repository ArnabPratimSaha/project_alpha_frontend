import React, { useEffect, useState } from 'react'
import Owl from '../owlComponent/owl';
import './navbar.css'
import Cookies from 'js-cookie';
import { FaDiscord } from "react-icons/fa";
import BotStatus from '../botStatus/botStaus';
import {  NavLink, useNavigate } from "react-router-dom";

export default function Navbar({mode,MODETYPE,updateMode,onStatusChange}) {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [shrink, setShrink] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [mobileSize, setMobileSize] = useState(window.innerWidth < 900 ? true : false);
    const navigate=useNavigate();
    const [status, setStatus] = useState(
        Cookies.get('temp_id') || Cookies.get('id') ? true : false
    ); //logged in
    const [imageSource, setImageSource] = useState(
        Cookies.get('temp_id') ? Cookies.get("temp_avatar") : Cookies.get('id') ? Cookies.get("avatar") : null
    );
    const [userName, setUserName] = useState(
        Cookies.get('temp_id') ? Cookies.get("temp_userName") : Cookies.get('id') ? Cookies.get("userName") : null
    );
    const [userTag, setUserTag] = useState(
        Cookies.get('temp_id') ? Cookies.get("temp_userTag") : Cookies.get('id') ? Cookies.get("userTag") : null
    );
    useEffect(() => {
        onStatusChange && onStatusChange(status);
    }, [status])
    const handleLogout = () => {
        if (!Cookies.get('temp_id')){
            setStatus((status) => !status);
        }
        if (Cookies.get('temp_id')) {
            Cookies.remove("temp_id");
            Cookies.remove("temp_discordId");
            Cookies.remove("temp_userName");
            Cookies.remove("temp_userTag");
            Cookies.remove("temp_avatar");
        }
        else {
            Cookies.remove("id");
            Cookies.remove("discordId");
            Cookies.remove("userName");
            Cookies.remove("userTag");
            Cookies.remove("avatar");

        }
        navigate('/');
    }
    const handleResize = () => {
        if (window.innerWidth > 900) {
            setIsWindowOpen(false);
            setMobileSize(false);
        }else{
            setMobileSize(true);
        }
    }
    const handleChange = () => {
        updateMode && updateMode();
    }
    const handleScroll=()=>{
        if (window.scrollY > 400) {
            setShrink(true);
        }else {
            setShrink(false)
        }
    }
    const [botStatus, setBotStatus] = useState(Cookies.get('bot-status') ? false : true);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return ()=>{
            window.removeEventListener('scroll',handleScroll);
            window.removeEventListener('resize',handleResize);
        }
    }, []);

    useEffect(() => {
        setLoadingPercentage(loadingPercentage)
    }, [loadingPercentage])
    const handleFocus = () => {
        if (window.innerWidth < 900) {
            setIsWindowOpen((s) => !s);
        }
    }
    const onLogout = () => {
        setLoadingPercentage(.3);
        setTimeout(() => {
            setLoadingPercentage(1);
            setTimeout(() => {
                handleLogout();
                setLoadingPercentage(0);
            }, 300);
        }, 1000);
    }
    const handleLogin = () => {
        window.location = `${process.env.REACT_APP_BACKENDAPI}auth/discord`
    }
    const handleClose = () => {
        Cookies.set('bot-status', 'done');
    }
    return (
        <div className='navbar-fulldiv'>
            <div className='main-body' style={{ height: shrink ? '3.5rem' : '5rem', backgroundColor: mode === MODETYPE.DARK ? '#222' : '#a8a8a8' }}>
                <div className='navbar-overlay' style={{ backgroundColor: mode === MODETYPE.DARK ? '#222' : '#a8a8a8' }}></div>
                <div className='navbar-svg' style={{ backgroundColor: mode === MODETYPE.DARK ? '#222' : '#a8a8a8' }}>
                    <h1 style={{ color: mode === MODETYPE.DARK ? '#cacaca' : '#333' }}>VIVI</h1>
                </div>
                {mobileSize && <h1 className='navbar-brandname' style={{ backgroundColor: mode === MODETYPE.DARK ? '#222' : '#a8a8a8', color: mode === MODETYPE.DARK ? '#fff' : '#222' }}>ViVI</h1>}
                <div className='navbar-loading-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#222' : '#a8a8a8' }}>
                    <div className='navbar-loading-bar' style={{ transform: `scaleX(${loadingPercentage})` }}>
                    </div>
                </div>
                <div className='navbar-links' style={{ color: mode === MODETYPE.DARK ? '#fff' : '#222', backgroundColor: mode === MODETYPE.DARK ? '#222' : '#a8a8a8' }}>
                    <NavLink className='navbar-links__link' to={'/'} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                        Home
                    </NavLink>
                    <NavLink className='navbar-links__link' to={`/dashboard/${Cookies.get('temp_id') || Cookies.get('id')}/${Cookies.get('temp_discordId') || Cookies.get('discordId')}`} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                        Dashboard
                    </NavLink>
                    <NavLink className='navbar-links__link' to={`/log/${Cookies.get('temp_id') || Cookies.get('id')}/${Cookies.get('temp_discordId') || Cookies.get('discordId')}`} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                        Log
                    </NavLink>
                    <NavLink className='navbar-links__link' to={'/learnmore'} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                        Learn About
                    </NavLink>
                </div>
                <div className='navbar-credentials' style={{ color: mode === MODETYPE.DARK ? '#fff' : '#222', backgroundColor: mode === MODETYPE.DARK ? '#222' : '#a8a8a8' }}>
                    {!status && <button className='navbar-login' onClick={handleLogin}>Log in</button>}
                    {status && <div className='navbar-loggedin-div'>
                        <div className='circle-image' >
                            <div className='circle-image__image'>
                                <img src={imageSource} onClick={handleFocus} />
                                {Cookies.get('temp_id') && <FaDiscord className='temp-user-discord-logo' />}
                            </div>
                            {!mobileSize && <span>{`${userName} #${userTag}`}</span>}
                        </div>
                        {!mobileSize && <button className='navbar-logout' onClick={onLogout}>Log Out</button>}
                        {isWindowOpen && <div className='navbar-small-window' style={{ backgroundColor: mode === MODETYPE.DARK ? '#000' : '#444' }}>
                            <span >{`${userName} #${userTag}`}</span>
                            <button className='navbar-logout' onClick={onLogout}>Log Out</button>
                        </div>}
                    </div>}
                    <div className='navbar-theme-togle' >
                        <Owl onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className='navlinks-mobile' style={{ height: shrink ? '0' : '2rem', backgroundColor: mode === MODETYPE.DARK ? '#555' : '#ffff', color: mode === MODETYPE.DARK ? '#fff' : '#222', }}>
                <NavLink className='navbar-links__link' to={'/'} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                    Home
                </NavLink>
                <NavLink className='navbar-links__link' to={`/dashboard/${Cookies.get('temp_id') || Cookies.get('id')}/${Cookies.get('temp_discordId') || Cookies.get('discordId')}`} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                    Dashboard
                </NavLink>
                <NavLink className='navbar-links__link' to={`/log/${Cookies.get('temp_id') || Cookies.get('id')}/${Cookies.get('temp_discordId') || Cookies.get('discordId')}`} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                    Log
                </NavLink>
                <NavLink className='navbar-links__link' to={'/learnmore'} style={({ isActive }) => isActive ? { color: mode === MODETYPE.DARK ? '#fff' : '#111' } : { color: mode === MODETYPE.DARK ? '#666' : '#555' }}>
                    Learn About
                </NavLink>
            </div>
            {<BotStatus botStatus={botStatus} onClose={handleClose} />}
        </div>
    )
}