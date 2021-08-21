import React,{useState,useEffect,useRef} from 'react'
import './bar.css';
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
            <div className='bar-bodydiv' style={{height:size?'10rem':'0'}}>
                <h1>hello</h1>
            </div>
        </div>
    )
}
// style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222',background:props.mode===props.MODETYPE.DARK?'#444':'#cacaca'}}
export default Bar
