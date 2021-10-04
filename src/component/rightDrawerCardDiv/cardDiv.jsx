import React from 'react'
import './cardDiv.css';
import { TiArrowSortedDown } from "react-icons/ti";
import Card from '../userCard/userCard';

function CardDiv(props) {
    return (
        <div className='card-fulldiv' style={{top:props.top,zIndex:props.zIndex}}>
            <div className='card-header' style={{backgroundColor:props.headerBackgroundColor,color:props.headerColor,borderBottomColor:'#fff',borderTopColor:'#fff'}}>
                <div style={{position:'absolute',zIndex:2,width:'100%',height:'100%',cursor:'pointer'}} onClick={props.onClick} ></div>
                <h2 style={{color:props.textColor}}>{props.headerTitle}</h2>
                <TiArrowSortedDown style={{transform:props.isOpen?'rotateZ(180deg)':'rotateZ(0deg)',color:props.textColor}} className='card-header-logo'/>
            </div>
            <div className='card-content' style={{backgroundColor:props.backgroundColor,height:props.contentHeight}}>
                {props.children}
            </div>
        </div>
    )
}

export default CardDiv
