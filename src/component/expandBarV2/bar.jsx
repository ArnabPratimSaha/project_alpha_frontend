import React,{useState,useEffect,useRef} from 'react'
import './bar.css';
import { FiExternalLink } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
function Bar(props) {
    const [size, setSize] = useState(false)
    const [remainingTime, setRemainingTime] = useState(props.time-new Date())
    const [remainingTimeString, setRemainingTimeString] = useState('')

    const [ticking, setTicking] = useState(0)
    const timer = useRef(null)
    useEffect(() => {
        if(props.status==='ONGOING')
        {
            if(props.time)
            {
                setRemainingTime(props.time.getTime()-new Date().getTime())
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
        if (props.status === 'ONGOING') {
            if (props.time)
                setRemainingTime(props.time.getTime() - new Date().getTime())
        }
    }, [ticking])
    useEffect(() => {
        if (props.status === 'ONGOING') {
            if (remainingTime >= 0) {

                let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let mins = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                let secs = Math.floor((remainingTime % (1000 * 60)) / 1000);
                setRemainingTimeString(`${days}D ${hours}H ${mins}MM ${secs}S`)
            }
        }
    }, [remainingTime])
    useEffect(() => {
        console.log('refresh');
    }, [])
    return (
        <div className='bar-fulldiv'>
            <div className='bar-bardiv' onClick={()=>{setSize((s)=>!s)}} style={{background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca',borderColor:props.mode===props.MODETYPE.DARK?'#cacaca':'#222'}}>
                <div className='discord-div'>
                    <div className='discord-div-pic'>
                        <img src={'https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/ib8j809rqa2mz60e_1602159530.jpeg'}/>
                    </div>
                    <p>guild  ad awd ad Name</p>
                </div>
                <div className='message-div' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222',background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca'}}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore excepturi, dolores molestiae alias in modi! Iure laboriosam mollitia cupiditate, optio illo voluptatum vero delectus facilis eius magni totam similique.</p>
                </div>
                <div className='status-div' >
                   {props.status==='CANCEL' && <div className='cancel-div'>
                       <span className='dot dot-red'/>
                       <p>cancelled</p>
                   </div> }
                   {props.status==='DONE' && <div className='done-div'>
                       <span className='dot dot-green'/>
                       <p>sent</p>
                   </div> }
                   {props.status==='ONGOING' && <div className='ongoing-div'>
                        <span className='dot dot-yellow'/>
                        <p>{remainingTimeString}</p>
                    </div>}
                </div>
            </div>
            <div className='bar-bodydiv' style={{height:size?'20rem':'0'}}>
                <div className='bar-bodydiv-left-div'>
                    <div className='bar-bodydiv-title' style={{background:props.mode===props.MODETYPE.DARK?'#555':'#545454'}}>

                    </div>
                    <div className='bar-bodydiv-body' style={{background:props.mode===props.MODETYPE.DARK?'#666':'#f6f6f6'}}>

                    </div>
                </div>
                <div className='bar-bodydiv-right-div' style={{background:props.mode===props.MODETYPE.DARK?'#333':'#cacaca'}}>
                    <div className='bar-bodydiv-right-div-info'>
                        <div className='bar-bodydiv-right-div-info-messagetype'>
                            <span>{props.messageType==='dm'?'DIRECT Message':'Channel Message'}</span>
                        </div>
                        <div className='bar-bodydiv-right-div-info-status'>
                            {props.status==='CANCEL' && <span style={{backgroundColor:'red'}}>cancelled</span>}
                            {props.status==='DONE' && <span style={{backgroundColor:'green'}}>{`sent on ${props.time}`}</span>}
                            {props.status==='ONGOING' && <span style={{backgroundColor:'greenyellow',color:'#333'}}>{`remaining ${remainingTimeString}`}</span>}
                        </div>
                    </div>
                    <div className='bar-bodydiv-right-div-icon-div'>
                        <div className='bar-bodydiv-right-div-icon'>
                            <AiFillStar className='bar-icon' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}/>
                            <FiExternalLink className='bar-icon' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}/>
                        </div>
                        <div className='bar-bodydiv-right-div-delete'>
                            <RiDeleteBin6Fill className='bar-icon delete-icon'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
// style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222',background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca'}}
export default Bar
