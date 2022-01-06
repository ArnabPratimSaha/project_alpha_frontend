import React from 'react'
import './loading.css';
import Navbar from '../../component/navbar/navbar';

function Loading({mode,MODETYPE,setIsLoggedin,updateMode,onStatusChange}) {
    return (
        <div className='loading-topdiv' style={{ backgroundColor: mode === MODETYPE.DARK ? '#444' : '#cacaca' }}>
            <Navbar mode={mode} MODETYPE={MODETYPE} updateMode={updateMode} onStatusChange={onStatusChange}/>
            <div className='loading-spinner' style={{ background:mode === MODETYPE.DARK ? '#444' : '#cacaca',color: mode === MODETYPE.DARK ? '#fff' : '#444' }}>
                <span>V</span>
                <span>I</span>
                <span>V</span>
                <span>I</span>
            </div>
            <div className='loading__loading'  style={{ color: mode === MODETYPE.DARK ? '#fff' : '#444' }}>
                <p>Loading</p>
                <p className='loading-dot'>...</p>
            </div>
        </div>
    )
}
const Authenticating=({mode,MODETYPE})=>{
    return (
        <div className='loading-topdiv' style={{ backgroundColor: mode === MODETYPE.DARK ? '#444' : '#cacaca' }}>
            <div className='loading-spinner' style={{ background:mode === MODETYPE.DARK ? '#444' : '#cacaca',color: mode === MODETYPE.DARK ? '#fff' : '#444' }}>
                <span>V</span>
                <span>I</span>
                <span>V</span>
                <span>I</span>
            </div>
            <div className='loading__loading' style={{ color: mode === MODETYPE.DARK ? '#fff' : '#444' }}>
                <p >Authenticating</p>
                <p className='loading-dot'>...</p>
            </div>
        </div>
    )
}
export { Loading, Authenticating }
