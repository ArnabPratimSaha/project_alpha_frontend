import {useEffect,useState} from 'react';

//this hook allows user to  change theme of the window
const MODETYPE={
    LIGHT:'light',
    DARK:'dark'
}

export default function useMode() {
    const [mode, setMode] = useState()
    useEffect(()=>{
        if(!localStorage.getItem('MODE'))
        {
            localStorage.setItem('MODE',MODETYPE.DARK);
            setMode(MODETYPE.DARK)
        }
        else
        {
            setMode(localStorage.getItem('MODE'))
        }
    },[]);
    const changeMode=()=>{
        if(mode===MODETYPE.DARK)localStorage.setItem('MODE',MODETYPE.LIGHT);
        else localStorage.setItem('MODE',MODETYPE.DARK);
        setMode(localStorage.getItem('MODE'))
    }
    const updateMode=()=>{
        setMode(localStorage.getItem('MODE'))
    }
    return [mode,changeMode,MODETYPE,updateMode];
}
