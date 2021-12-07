import React from 'react'
import './input.css';
import { BsSearch } from 'react-icons/bs';
function Input(props) {
    return (
        <div className={`input-component-fulldiv ${props.className}`} >
            <div className='input-component-icons' style={{background:props.mode===props.MODETYPE.DARK?'#666':'#cacaca',color:props.mode===props.MODETYPE.DARK?'#cacaca':'#222'
            ,boxShadow:props.mode===props.MODETYPE.DARK?'2px 2px 4px #333':'2px 2px 4px #666'}}>
                <BsSearch />
            </div>
            <input style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}} value={props.value} onChange={(e)=>{if(props.onChange)props.onChange(e)}} placeholder={props.placeholder}></input>
        </div>
    )
}

export default Input
