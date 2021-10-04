import React from 'react'
import './timeCard.css'

function Timecard(props) {
    return (
        <div className='timecard-fulldiv'>
            <div className='timecard-detail'>
                <p>{props.data}</p>
            </div>
            <div className='timecard-time'>
                <p>{props.time}</p>
            </div>
        </div>
    )
}

export default Timecard
