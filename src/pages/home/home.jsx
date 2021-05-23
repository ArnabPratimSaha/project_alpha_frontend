import React, { useState } from 'react'
import Navbar from '../../component/navbar/navbar';
import ViviFrontPageBot from '../../component/vivifrontpagebot/viviFrontPageBot';
import useMode from '../../customhooks/useMode'
import './home.css';
import DateTimePicker from 'react-datetime-picker';
var someDate = new Date();
var numberOfDaysToAdd = 6;
someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

var someDate2 = new Date();
someDate.setDate(someDate.getDate() - 1); 
export default function Home() {
    const [mode,changeMode,MODETYPE,updateMode]=useMode();
    const [value, onChange] = useState(new Date());
    const handleOnModeUpdate=()=>{
        updateMode();
    }
    return (
        <div className='home-full-div' style={{backgroundColor:mode===MODETYPE.DARK?'#444':'#cacacaca'}}>
            <Navbar onUpdateMode={handleOnModeUpdate}/>
            <div className='home-intro' >
                <div className='home-intro__title' style={{color:mode===MODETYPE.DARK?'#fff':'#233'}}>
                    <h1>Let Vivi handle your anouncement's</h1>
                    <h2>forget about forgetting</h2>
                </div>
                <div className='bot-div'>
                    <ViviFrontPageBot/>
                </div>
                <div className='home-intro__add-div' style={{color:mode===MODETYPE.DARK?'#fff':'#222'}}>
                    <h1>add vivi to your discord server today</h1>
                    <span style={{borderColor:mode===MODETYPE.DARK?'#fff':'#000',color:mode===MODETYPE.DARK?'#fff':'#222'}}>add vivi</span>
                    <span style={{borderColor:mode===MODETYPE.DARK?'#fff':'#000',color:mode===MODETYPE.DARK?'#fff':'#222'}}>learn more</span>
                </div>
            </div>
            <div className='home-learn-more' style={{backgroundColor:mode===MODETYPE.DARK?'#555':'#cacaca'}}>
                <DateTimePicker
                
                    onChange={onChange}
                    maxDetail={"second"}
                    value={value}
                    disableClock='true'
                    maxDate={someDate}
                    minDate={someDate2}
                    />
            </div>
        </div>
    )
}
