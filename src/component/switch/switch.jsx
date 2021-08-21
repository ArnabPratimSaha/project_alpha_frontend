import React,{useState,useEffect} from 'react'
import './switch.css';
function Switch(props) {
    const [toggler, setToggler] = useState('LEFT')
    const handleToggler=(e)=>{
        e.preventDefault();
        setToggler((s)=>{
            if(s==='LEFT')
                return 'RIGHT';
            else
                return 'LEFT';
        })
    }
    useEffect(() => {
        if(props.onChange)
        {
            props.onChange(toggler)
        }
    }, [toggler])
    return (
        <div className='switch-fulldiv'>
            <div className='switch-left-div'>
                <p>{props.left}</p>
                <div className='switch-bottombar' style={{transform:toggler==='LEFT'?'scaleX(1)':'scaleX(0)'}}></div>
            </div>
            <div className='switch-div-switch' onClick={handleToggler}>
                <div className='switch-bar'></div>
                <div className='switch-toggeler' style={{transform:toggler==='LEFT'?'translate(0px,-50%)':'translate(40px,-50%)'}}></div>
            </div>
            <div className='switch-right-div'>
                <p>{props.right}</p>
                <div className='switch-bottombar' style={{transform:toggler==='RIGHT'?'scaleX(1)':'scaleX(0)'}}></div>
            </div>
        </div>
    )
}

export default Switch
