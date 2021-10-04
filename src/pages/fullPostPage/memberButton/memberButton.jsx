import React from 'react'
import './memberButton.css';
function MemberButton(props) {
    return (
        <div className='member-button-fulldiv'>
            <div className='memberButton-left-div'>
                <img src={props.avater}></img>
            </div>
            <div className='memberButton-right-div'>
                <div className='memberButton-userName'>
                    <h3 style={{color:props.mode===props.MODETYPE.DARK?'#f8f8f8':'#333'}}>{props.userName}</h3>
                </div>
                <div className='memberButton-userTag'>
                    <p style={{color:props.mode===props.MODETYPE.DARK?'#cacaca':'#333'}}>{props.userTag}</p>
                </div>
            </div>
        </div>
    )
}

export default MemberButton
