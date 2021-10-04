import React,{useState,useEffect,useRef} from 'react'
import './bar.css';
import { FiExternalLink } from 'react-icons/fi';
import { AiFillStar,AiOutlineStar,AiFillCheckCircle,AiFillClockCircle,AiFillWarning } from 'react-icons/ai';
const status={
    PROCESSING:'PROCESSING',
    CANCELLED:'CANCELLED',
    SENT:'SENT',
}
const discordDivStyle=(s)=>{
    if(s===status.SENT)
        return {backgroundColor:'#81B214',borderColor:'#81B214'}
    else if(s===status.CANCELLED)
        return {backgroundColor:'#B61919',borderColor:'#B61919'}
    else 
        return {backgroundColor:'#2541B2',borderColor:'#2541B2'}
}

const makeGuildIcon=(s)=>{
    let array=s.split(/\s+/g);
    let icon='';
    array.forEach(e=>{icon=`${icon}${e.slice(0,1).toUpperCase()}`})
    return icon;
}
function NewBar(props) {
    const [size, setSize] = useState(false)
    const [star, setStar] = useState(false)
    const [remainingTime, setRemainingTime] = useState(new Date(Date.parse(props.time))-new Date())
    const [remainingTimeString, setRemainingTimeString] = useState('')

    const [ticking, setTicking] = useState(0)
    const timer = useRef(null)
    useEffect(() => {
        if(props.status===status.PROCESSING)
        {
            if(props.time)
            {
                setRemainingTime(new Date(Date.parse(props.time)).getTime()-new Date().getTime())
            }
            timer.current=setInterval(() => {
                setTicking((s)=>s+1)
            }, 1000);
            return () => {
                clearInterval(timer.current)
            }
        }
    }, [props.time])
    useEffect(() => {
        if (props.status === status.PROCESSING) {
            if (props.time)
                setRemainingTime(new Date(Date.parse(props.time)).getTime() - new Date().getTime())
        }
    }, [ticking])
    useEffect(() => {
        if(props.fav)
            setStar(props.fav)
    }, [props.fav])
    useEffect(() => {
        if (props.status === status.PROCESSING) {
            if (remainingTime >= 0) {

                let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let mins = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                let secs = Math.floor((remainingTime % (1000 * 60)) / 1000);
                setRemainingTimeString(`${days}D ${hours}H ${mins}MM ${secs}S`)
            }
        }
    }, [remainingTime])
    const handleStarClick=()=>{
        setStar((s)=>!s)
        if(props.onStarClick)
            props.onStarClick(props.mid,!star)
    }
    return (
        <div className='bar-fulldiv' onClick={()=>{window.location=`/post/${props.uid}/null/${props.did}/${props.mid}`}}>
            <div className='bar-bardiv' onClick={()=>{setSize((s)=>!s)}} style={{backgroundColor:props.mode===props.MODETYPE.DARK?'#555':'#cacaca',borderColor:props.mode===props.MODETYPE.DARK?'#cacaca':'#444'}}>
                <div className='discord-div'style={{...discordDivStyle(props.status)}} >
                    <div className='discord-div-pic'>
                        {!props.icon && <div>{makeGuildIcon(props.guildName)}</div> }
                        {props.icon && <img src={props.icon}/>}
                    </div>
                    <p>{props.guildName}</p>
                </div>
                <div className='message-div' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#000'}}>
                    <p>{props.title}</p>
                </div>
                <div className='status-div' style={{...discordDivStyle(props.status)}}>
                   {props.status===status.CANCELLED && <div className='cancel-div'  >
                       <AiFillWarning className='status-icon'/>
                       <p>cancelled</p>
                   </div> }
                   {props.status===status.SENT && <div className='done-div'>
                       <AiFillCheckCircle className='status-icon'/>
                       <p>sent</p>
                   </div> }
                   {props.status===status.PROCESSING && <div className='ongoing-div'>
                        <AiFillClockCircle className='status-icon'/>
                        <p>{remainingTimeString}</p>
                    </div>}
                </div>
                <div className='status-div-icon-div' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}>
                    <FiExternalLink className='bar-icon' onClick={()=>{}}/>
                    {star?<AiFillStar  className='bar-icon' style={{color:'yellow'}} onClick={handleStarClick}/>:<AiOutlineStar className='bar-icon' onClick={handleStarClick}/>}
                </div>
            </div>
        </div>
    )
}
// style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222',background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca'}}
export default NewBar
