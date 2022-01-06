import React, { useEffect, useRef, useState } from 'react'
import './home.css';
import lottie from "lottie-web";
import channelImage from './images/pic.png'
import Brightup from '../../component/brightup/brightup';
import Server from './components/discordserver/server';
import axios from 'axios'
import Button from './components/button/button';
import Footer from '../../component/footer/footer';

export default function Home({mode,MODETYPE}) {
    
    const [serverInfo, setServerInfo] = useState([])
    const current = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            container: current.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("./main robot.json")
        });
    }, []);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKENDAPI}info?c=5`).then((res) => {
            setServerInfo(res.data);
        }).catch((error) => { })
    }, [])
    return (
        <div className='home-full-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#444' : '#cacacaca' }}>
            <div className='home-intro' >
                <div className='home-intro__title' style={{ color: mode === MODETYPE.DARK ? '#fff' : '#233' }}>
                    <h1>Let Vivi handle your announcement's</h1>
                    <h2>forget about forgetting</h2>
                </div>
                <div className='bot-div' ref={current}>
                </div>
                <div className='home-intro__add-div' style={{ color: mode === MODETYPE.DARK ? '#fff' : '#222' }}>
                    <h1>add vivi to your discord server today</h1>
                    <span style={{ borderColor: mode === MODETYPE.DARK ? '#fff' : '#000', color: mode === MODETYPE.DARK ? '#fff' : '#222' }} onClick={() => { window.open(`${process.env.REACT_APP_BOTLINK}`) }}>add vivi</span>
                    <span style={{ borderColor: mode === MODETYPE.DARK ? '#fff' : '#000', color: mode === MODETYPE.DARK ? '#fff' : '#222' }}>learn more</span>
                </div>
            </div>
            {serverInfo.length > 0 && <div className='bot-server-used-div' style={{ backgroundColor: mode === MODETYPE.DARK ? '#333' : '#cacaca' }}>
                <Brightup type='Y' direction='-'>
                    <h1 style={{ color: mode === MODETYPE.DARK ? '#fff' : '#222' }}>{`VIVI is popular among ${serverInfo && serverInfo.length} servers`}</h1>
                </Brightup>
                <div className='bot-server-used'>
                    {serverInfo.map((i, index) => <Brightup key={index} type='Y' direction='+' delay={400 * index}><Server mode={mode} MODETYPE={MODETYPE} count={i.memberCount} name={i.name} img={i.avater} isPartnered={i.isPartnered} /></Brightup>)}
                </div>
            </div>}
            <div className='bot-info-div'>
                <Brightup Brightup type='Y' direction='+'>
                    <div className='bot-info-send-channel-info'>
                        <div className='send-channel-info__image'>
                            <img className='bot-info-div__image' src={channelImage} />
                        </div>
                        <div className='send-channel-info__text'>
                            <h1 style={{ color: mode === MODETYPE.DARK ? '#fff' : '#222' }}>Send schedule message to your discord channel at any time.</h1>
                            <p style={{ color: mode === MODETYPE.DARK ? '#cacaca' : '#000' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo animi beatae modi, cum quo a sapiente autem dolor facilis, quas libero! Suscipit ex, cupiditate repellendus modi esse porro nesciunt eaque?</p>
                            <Button style={{ backgroundColor: '#ff5d2c', color: '#fff' }} onClick={() => { window.open(`${process.env.REACT_APP_BOTLINK}`) }} name='Invite VIVI' />
                        </div>
                    </div>
                </Brightup>
                <Brightup Brightup type='Y' direction='+'>
                    <div className='bot-info-send-dm-info'>
                        <div className='send-dm-info__text'>
                            <h1 style={{ color: mode === MODETYPE.DARK ? '#fff' : '#222' }}>Send direct message within your server to anyone any time.</h1>
                            <p style={{ color: mode === MODETYPE.DARK ? '#cacaca' : '#000' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo animi beatae modi, cum quo a sapiente autem dolor facilis, quas libero! Suscipit ex, cupiditate repellendus modi esse porro nesciunt eaque?</p>
                        </div>
                        <div className='send-dm-info__image'>
                            <img className='bot-info-div__image' src={channelImage} />
                        </div>
                    </div>
                </Brightup>
                <Brightup Brightup type='Y' direction='+'>
                    <div className='bot-info-log'>
                        <div className='bot-info-log__image'>
                            <img className='bot-info-div__image' src={channelImage} />
                        </div>
                        <div className='bot-info-log__text'>
                            <h1 style={{ color: mode === MODETYPE.DARK ? '#fff' : '#222' }}>Track your message history.</h1>
                            <p style={{ color: mode === MODETYPE.DARK ? '#cacaca' : '#000' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo animi beatae modi, cum quo a sapiente autem dolor facilis, quas libero! Suscipit ex, cupiditate repellendus modi esse porro nesciunt eaque?</p>
                        </div>
                    </div>
                </Brightup>
            </div>
            {/* <div className='home-learn-more' style={{backgroundColor:mode===MODETYPE.DARK?'#555':'#cacaca'}}>
            </div> */}
            <Footer mode={mode} MODETYPE={MODETYPE} />
        </div>
    )
}
