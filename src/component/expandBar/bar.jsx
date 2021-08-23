import React,{useState,useEffect,useRef} from 'react'
import './bar.css';
import { FiExternalLink } from 'react-icons/fi';
import { AiFillStar,AiOutlineStar } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
const status={
    PROCESSING:'PROCESSING',
    CANCELLED:'CANCELLED',
    SENT:'SENT',
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
    return (
        <div className='bar-fulldiv'>
            <div className='bar-bardiv' onClick={()=>{setSize((s)=>!s)}} style={{background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca',borderColor:props.mode===props.MODETYPE.DARK?'#cacaca':'#444'}}>
                <div className='discord-div'>
                    <div className='discord-div-pic'>
                        <img src={'https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/ib8j809rqa2mz60e_1602159530.jpeg'}/>
                    </div>
                    <p>guild  ad awd ad Name</p>
                </div>
                <div className='message-div' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222',background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca'}}>
                    <p>{props.title}</p>
                </div>
                <div className='status-div' >
                   {props.status===status.CANCELLED && <div className='cancel-div'>
                       <span className='dot dot-red'/>
                       <p>cancelled</p>
                   </div> }
                   {props.status===status.SENT && <div className='done-div'>
                       <span className='dot dot-green'/>
                       <p>sent</p>
                   </div> }
                   {props.status===status.PROCESSING && <div className='ongoing-div'>
                        <span className='dot dot-yellow'/>
                        <p>{remainingTimeString}</p>
                    </div>}
                </div>
                <div className='status-div-icon-div' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}>
                    <FiExternalLink className='bar-icon' onClick={()=>{}}/>
                    {star?<AiFillStar  className='bar-icon' style={{color:'yellow'}} onClick={()=>{setStar(false)}}/>:<AiOutlineStar className='bar-icon' onClick={()=>{setStar(true)}}/>}
                </div>
            </div>
        </div>
    )
}
// style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222',background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca'}}
export default NewBar
