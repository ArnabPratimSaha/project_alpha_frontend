import React from 'react'
import './viviface.css';
export default function ViviFace() {
    const handleMouseOver=()=>{
        const eye=document.getElementById('eye_1_');
        eye.style.animationName='eye-move'
        eye.style.animationDuration='1.5s'
        eye.style.animationTimingFunction='ease-in-out'
    }
    const handleMouseLeft=()=>{
        const eye=document.getElementById('eye_1_');
        eye.style.animation='none'
    }
    return (
        <div className='robot-head-fulldiv'>
            <div id='robot-head-overlay' onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeft}></div>
            <div className='robot-head-svg'>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 198.59 161.53" xmlSpace="preserve">
                <path className="st0" style={{fill: `#71a7c6`}} d="M29,148.07c5.47,0.21,7.92-2.06,7.86-8.52c-0.19-20.49-0.16-40.98-0.01-61.46c0.04-5.83-1.91-8.71-7.2-8.33
                    c-1.27,0.09-2.56,0.01-3.84,0c-13.41-0.04-14.73-2.2-10.64-17.4c3.93-8.27,9.36-15.05,15.86-20.86
                    C51.89,12.82,75.98,5.37,102.07,7.61c26.43,2.28,49.33,11.08,65.33,31.43c2.91,4.34,5.82,8.68,8.73,13.02
                    c2.08,5.04,4.16,10.09,6.23,15.13c0.17,0.48,0.33,0.96,0.5,1.45c3.6,26.41,0.71,53.01,1.83,79.49c-0.73,13.08-0.73,13.05-12.83,13.1
                    c-7.6,0.03-15.19,0.17-22.79,0.26c-0.48,0.01-0.96,0.03-1.44,0.04c-0.52-0.04-1.04-0.08-1.56-0.12c-0.99,0.01-1.97,0.01-2.96,0.01
                    c-1.09,0-2.17,0-3.26,0c-27.64-1.02-55.29-1.03-82.93,0c-2.19-0.69-4.39-1.01-6.57,0.04c-10.24-0.09-20.47-0.2-30.71-0.24
                    C8.05,161.17,8.05,161.2,7.5,148C14.67,148,21.84,147.8,29,148.07z"/>
                <path className="st1" style={{fill: `#71a7c3`}} d="M7.5,148c7.16,0,14.33-0.2,21.49,0.07c5.47,0.21,7.92-2.06,7.86-8.52c-0.19-20.49-0.16-40.98-0.01-61.46
                    c0.04-5.83-1.91-8.71-7.2-8.33c-1.27,0.09-2.56,0.01-3.84,0c-13.41-0.04-14.73-2.2-10.64-17.4c-0.97-11.39-5.82-23.18,4.02-33.16
                    c4.07-4.13,3.29-12.52-1.03-16.2C13.28-1.14,8.15-1.13,3.62,3.88C-1.12,9.11-1.2,15.79,3.73,19.69C9,23.87,9.12,28.67,9.01,34.5
                    c-0.14,7.79-0.18,15.59,0,23.38c0.12,5.36,0.35,10.09-5.66,12.15c-3.26,1.12-3.34,5.39-3.34,8.96C0.02,98.91,0.02,118.82,0,138.74
                    C-0.01,144.46,1.63,148.39,7.5,148z"/>
                <path className="st1" style={{fill: `#71a7c3`}} d="M182.86,68.64c3.6,26.41,0.71,53.01,1.83,79.49c2.56-0.01,5.12,0.01,7.68-0.03c4.1-0.07,6.03-2.49,6.03-7.08
                    c-0.02-21.66-0.02-43.32-0.03-64.97c0-2.44-0.49-5.24-2.48-5.94c-6.44-2.26-5.45-7.91-5.41-13.3c0.05-6.93,0.12-13.86-0.02-20.79
                    c-0.12-6.35-0.26-12.01,5.13-16.82c4.59-4.1,3.53-11.95-0.76-16.08c-4.26-4.1-11.94-3.82-15.33,1.04
                    c-3.79,5.44-4.31,11.66,0.81,16.13c3.83,3.34,4.6,6.95,4.49,11.83c-0.22,9.52-0.01,19.06-0.09,28.59
                    C184.7,63.47,185.44,66.58,182.86,68.64z"/>
                <path className="st2" style={{fill:'#cadcdf'}} d="M5.76,59.35c105.27-62.49,185.61,4.69,185.61,4.69l-1.39,89.04c-60.95-0.52-121.9-1.04-182.84-1.56"/>
                <path className="st0" style={{fill: `#71a7c6`}} d="M20.99,65.18c35.2-23.17,62.25-25.92,80.87-23.77c33.79,3.88,75.65,27.97,75.65,27.97l0,0l-1.17,79.8
                    c-51.4-0.47-102.79-0.93-154.19-1.4c0-0.35-0.01-0.7-0.01-1.05C21.76,119.54,21.38,92.36,20.99,65.18z"/>
                <g id="eye_1_">
                    <path className="st1" style={{fill: `#323845`}} d="M64.89,86.16c4.71-23.96,8.31,1.8,8.31,1.8l-0.06,34.14c-2.73-0.2-5.46-0.4-8.19-0.6"/>
                    <path className="st1" style={{fill: `#323845`}} d="M134.62,85.99c4.71-23.96,8.31,1.8,8.31,1.8l-0.06,34.14c-2.73-0.2-5.46-0.4-8.19-0.6"/>
                </g>
                <path className="st1" style={{fill: `#323845`}} d="M22.29,147.87c-0.26-27.7-0.51-55.4-0.77-83.11c2.22-1.05,5.37-2.69,8.94-5.11c1.1-0.75,1.84-1.29,2.17-1.53
                    c5.17-3.75,12.52-6.46,17.62-8.3c7.15-2.58,13.28-4.66,18.13-6.26c4.44-1.1,10.54-2.26,17.87-2.55c8.21-0.33,16.97,0.45,16.98,1.15
                    c0.01,0.98-17.35-0.42-36.34,5.4c-7.92,2.43-17.72,6.62-18.3,6.85c-2.77,1.11-5.74,2.58-8.96,4.26c-4.74,2.47-10.02,5.62-12.15,8.34
                    c-0.16,25.93-0.31,51.86-0.47,77.79c49.4,1.13,98.81,2.27,148.21,3.4C124.25,148.09,73.27,147.98,22.29,147.87z"/>
                </svg>
            </div>
            
        </div>
    )
}
