import React, { useEffect, useState } from 'react'
import './styles.css';

function MultilineInputComponent(props) {
    const [isFocused,setIsFocused]=useState(props.isFocused)
    useEffect(()=>{
        if(props.isFocused!=undefined)
            setIsFocused(props.isFocused);
        },[props.isFocused])
    return (
        <div style={
            {
                borderWidth:isFocused?'2px':'1px',
                borderColor:isFocused?'#fff':'#000',
                boxShadow:isFocused?'2px 2px 5px #444':'none',
                backgroundColor:isFocused?props.mode==='dark'?'#555':'#cacaca':'inherit'
            }
        } className={`InputComponent_fulldiv ${props.classFulldiv}`}>
            {props.label&&<div style={{
                backgroundColor:props.mode==='dark'?'#555':'#cacaca',
                color:props.mode==='dark'?'#fff':'#000',
                width:isFocused?'6rem':'10rem',
            }}
                className={`InputComponentLabelDiv ${props.classLabeldiv}`}><p>{props.label}</p></div>}
            {props.children}
        </div>
        
    )
}
export default MultilineInputComponent
