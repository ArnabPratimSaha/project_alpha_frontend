import React, { useEffect,useRef,useState } from 'react'
import useMode from '../../customhooks/useMode';
import {useParams} from 'react-router-dom'; 
import './authentication.css';
import {setInfo,getInfo} from '../../uitilityFunction/manageInfo';
import axios from 'axios';
import Cookie from 'js-cookie';
import Loader from "react-loader-spinner";
import { colorPalettes } from '../../stylesandthemes/themes';
const fetchData=async(type,value)=>{
    try {
        const res=await axios.get(`http://localhost:5000/user/info?type=${type}&value=${value}`)
        console.log(res);
        if(res.status===200)
        {
            return res;
        }
        return null;
    } catch (error) {
        const res=error.response;
        if(res)
        {
            return res;
        }
    }
}

function Authentication() {
    const [mode, changeMode, MODETYPE, updateMode] = useMode();
    const {uid}=useParams();
    const [isVerifying, setIsVerifying] = useState(true)
    const [verified, setVerified] = useState(false)
    const [message, setMessage] = useState('verifying')
    const [imageSource,setImageSource]=useState(null);
    const [userName,setUserName]=useState(null);
    const [userTag,setUserTag]=useState(null);
    const data = useRef(null)
    useEffect(()=>{
        fetchData('userId',uid).then((res)=>{
            console.log(res);
            if(res.status===200)
            {
                setIsVerifying(false);
                setVerified(true);
                data.current=JSON.parse(res.data);
                setMessage('verified')
            }
            else
            {
                setIsVerifying(false);
                setVerified(false)
                window.location=`/error/${res.status}`
            }
        }).catch((err)=>{
            window.location=`/error/700`
        })
    },[])
    useEffect(()=>{
        if(verified)
        {
            Cookie.set('id',data.current.userId,{expires:14});
            Cookie.set('discordId',data.current.discordId,{expires:14});
            Cookie.set('userName',data.current.userName,{expires:14});
            Cookie.set('userTag',data.current.userTag,{expires:14});
            Cookie.set('avatar',`https://cdn.discordapp.com/avatars/${data.current.discordId}/${data.current.avatar}`,{expires:14})
            setImageSource(`https://cdn.discordapp.com/avatars/${data.current.discordId}/${data.current.avatar}`)
            setUserName(data.current.userName)
            setUserTag(data.current.userTag)
            setMessage('redirecting to home')
            setTimeout(() => {
                window.location='/home';
            }, 1000);
        }
    },[verified])
    return (
        <>
            <div className='auth-fulldiv' style={{background:mode===MODETYPE.DARK?'#333':'#f3f3f3'}}>
                <div className='auth-center-div' style={{background:mode===MODETYPE.DARK?colorPalettes.DARKEIGHT:'#cacaca'}}>
                    {isVerifying && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
                    {verified && <img src={imageSource}></img>}
                    {verified && <h2>{`Welcome ${userName}#${userTag}`}</h2>}
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}
export default Authentication
