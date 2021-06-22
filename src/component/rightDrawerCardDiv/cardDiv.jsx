import React from 'react'
import './cardDiv.css';
import { TiArrowSortedDown } from "react-icons/ti";
import Card from '../userCard/userCard';

function CardDiv(props) {
    return (
        <div className='card-fulldiv' style={{top:props.top,zIndex:props.zIndex}}>
            <div className='card-header' style={{backgroundColor:props.headerBackgroundColor,color:props.headerColor,boxShadow:props.isOpen?'0px 2px 5px #333':'none'}}>
                <div style={{position:'absolute',zIndex:2,width:'100%',height:'100%',cursor:'pointer'}} onClick={props.onClick} ></div>
                <h2>{props.headerTitle}</h2>
                <TiArrowSortedDown style={{transform:props.isOpen?'rotateZ(180deg)':'rotateZ(0deg)'}} className='card-header-logo'/>
            </div>
            <div className='card-content' style={{backgroundColor:props.backgroundColor,height:props.contentHeight}}>
                {props.children}
            </div>
        </div>
    )
}

export default CardDiv
