import React,{useRef} from 'react'
import './memberButton.css'
import { AiFillPlusSquare } from 'react-icons/ai';
import { FaMinusSquare } from 'react-icons/fa';

let name;
function MemberButton(props) {
    name=(props.nickName||props.userName).toString().split(/\s+/g);
    return (
        <div className={`memberbutton-fulldiv ${props.classNameFullDiv}`} style={{background:props.mode===props.MODETYPE.DARK?'#444':'#fff',color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}>
            {props.img && <img src={props.img}></img>}
            {!props.img && <div className='memberbutton-custom-image-div'>{name[0].slice(0,1)}{name.length>1&&name[1].slice(0,1)}</div>}
            <div className={`memberbutton-infoDiv ${props.classNameInfoDiv}`}>
               {props.nickName && <h6>{props.nickName}</h6>}
               {!props.nickName && props.userName && <h6>{props.userName}#{props.userTag}</h6>}
               {props.nickName && <p>{props.userName}#{props.userTag}</p>}
            </div>
            <div className={props.classNameChildrenDiv}>
                {props.children}
            </div>
            {
                props.type === 'add' && <AiFillPlusSquare style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#333'}} className={`memberbutton-icon ${props.classNameIcon}`} onClick={() => { props.onClick(props.id) }} />
            }
            {
                props.type === 'remove' && <FaMinusSquare style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#333'}} className={`memberbutton-icon ${props.classNameIcon}`} onClick={() => { props.onClick(props.id) }} />
            }
        </div>
    )
}

export default MemberButton
