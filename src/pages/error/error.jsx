import react,{useEffect, useState} from "react";
import "./error.css";
import {useParams} from 'react-router-dom';
import useMode from "../../customhooks/useMode";

const Error=props=>
{
    const [code, setCode] = useState(useParams().code)
    const [message, setMessage] = useState('Unknown Error')
    const [title, setTitle] = useState('An Error Has Occurred');
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    useEffect(()=>{
        if(code==='404')
            setMessage('Not Found')
        else if(code==='403')
            setMessage('Forbidden')
        else if(code==='400')
            setMessage('Bad Request')
        else if(code==='500')
            setMessage('Internal Server Error')
        else if(code==='405')
        {
            setTitle('Link Expired')
            setMessage('Link Expired-Please Create A New Link');
        }
        else 
            setMessage('Unknow Error')
    },[])
    return(
        <div className='error-full-div' style={{ backgroundColor: mode === MODETYPE.DARK ? "#444" : "#cacacaca"}}>
            <div className="error-div" >
                <i className="far fa-frown fa-10x" ></i>
                <h1 style={{ color: mode === MODETYPE.DARK ? "#cacaca" : "#000", }}>{code}</h1>
                <h2 style={{ color: mode === MODETYPE.DARK ? "#ffffff" : "#222", }}>{title}</h2>
                <p style={{ color: mode === MODETYPE.DARK ? "#cacaca" : "#000", }}>{message}</p>
                <h6 style={{ color: mode === MODETYPE.DARK ? "#cacaca" : "#000", }}>Go to</h6><a href="/home"  style={{ color: mode === MODETYPE.DARK ? "#fff" : "#333", }}> home </a><h6  style={{ color: mode === MODETYPE.DARK ? "#cacaca" : "#000", }}>page </h6>
            </div>

        </div>
    )
}
export default Error;
