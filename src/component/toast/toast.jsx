import React,{useState,useEffect} from 'react'
import { AiFillCheckCircle,AiFillWarning,AiOutlineClose } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import './toast.css';
const type={
    DEFAULT:'DEFAULT',
    WARNING:'WARNING',
    ERROR:'ERROR'
}
const fullDivStyle=(toastType)=>{
    if(toastType===type.DEFAULT)
        return {backgroundColor:'#ACFFAD',borderLeftColor:'#064420',borderRightColor:'#50CB93'}
    else if(toastType===type.ERROR)
        return {backgroundColor:'#FDD2BF',borderLeftColor:'#B61919',borderRightColor:'#FF6B6B'}
    else 
        return {backgroundColor:'#FDE49C',borderLeftColor:'#DF711B',borderRightColor:'#FFB740'}
}
const rightDivStyle=(toastType)=>{
    if(toastType===type.DEFAULT)
        return {backgroundColor:'#50CB93',color:'#161616'}
    else if(toastType===type.ERROR)
        return {backgroundColor:'#FF6B6B',color:'#B61919'}
    else 
        return {backgroundColor:'#FFB740',color:'#DF711B'}
}
const leftDivStyle=(toastType)=>{
    if(toastType===type.DEFAULT)
        return {color:'#064420'}
    else if(toastType===type.ERROR)
        return {color:'#B61919'}
    else 
        return {color:'#DF711B'}
}
const bottomBar=(toastType)=>{
    if(toastType===type.DEFAULT)
        return {backgroundColor:'#064420'}
    else if(toastType===type.ERROR)
        return {backgroundColor:'#B61919'}
    else 
        return {backgroundColor:'#DF711B'}
}
function Toast(props) {
    const [toastType, setToastType] = useState(type.WARNING)
    const [isOpen, setIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    useEffect(() => {
        if(props.isOpen)
            setIsOpen(props.isOpen)
    }, [props.isOpen])
    useEffect(() => {
        if(props.message)
            setToastMessage(props.message)
    }, [props.message])
    useEffect(() => {
        if(props.toastType)
            setToastType(props.toastType)
    }, [props.toastType])
    const handleClose=()=>{
        setIsOpen(false)
        if(props.onClose)
            props.onClose()
    }
    useEffect(() => {
        if(isOpen)
        {
            setTimeout(() => {
                handleClose()
            }, props.toastDuration?props.toastDuration*1000:4000);
        }
    }, [isOpen])
    return (
        <div className='popup-fulldiv' style={{...fullDivStyle(toastType),transform:isOpen?'translateY(-2rem)':'translateY(10rem)'}}>
            <div className='popup-leftdiv' style={leftDivStyle(toastType)}>
                {toastType===type.DEFAULT && <AiFillCheckCircle />}
                {toastType===type.WARNING && <RiErrorWarningFill />}
                {toastType===type.ERROR && <RiErrorWarningFill />}
            </div>
            <div className='toast-content-div'>
                <p>{toastMessage}</p>
            </div>
            <div className='popup-rightdiv' style={rightDivStyle(toastType)} onClick={handleClose}>
                <AiOutlineClose />
            </div>
            <div className='toast-time-div' style={{...bottomBar(toastType),animationName:isOpen?'anim':'none',animationDuration:props.toastDuration?`${props.toastDuration}000ms`:'4000ms'}}></div>
        </div>
    )
}

export default Toast
