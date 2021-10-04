import React,{useState,useEffect} from 'react'
import './pageToggler.css';
import { AiOutlineClockCircle,AiFillStar } from 'react-icons/ai';

function PageToggler(props) {
    const [active, setActive] = useState('LEFT')
    useEffect(() => {
        props.onChange(active)
        return () => {
            props.onChange('LEFT')
        }
    }, [active])
    return (
        <div className='pagetoggler-fulldiv'>
            <div className='pagetoggler-history' onClick={()=>{setActive('LEFT')}} style={{transform:active==='LEFT'?'scale(1)':'scale(.8)'}}>
                <AiOutlineClockCircle className='pagetoggler-icons' />
            </div>
            <div className='pagetoggler-favourite' onClick={()=>{setActive('RIGHT')}} style={{transform:active==='RIGHT'?'scale(1)':'scale(.8)'}}>
                <AiFillStar className='pagetoggler-icons' />
            </div>
        </div>
    )
}

export default PageToggler
