import React,{useRef,useEffect,useState} from 'react'
import './brightup.css'
function Brightup(props) {
    const component = useRef()
    const isDone=useRef(false);
    const [isIntersecting, setIsIntersecting] = useState(false)
    useEffect(() => {
        observer.observe(component.current)
    }, [])
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isDone.current) {
            isDone.current = true;
            if(props.delay)
            {
                setTimeout(() => {
                    setIsIntersecting(true);
                }, props.delay);
            }
            else
                setIsIntersecting(true);
        }
    })

    return (
        <div ref={component} className='brightup-full-div' style={{transform:isIntersecting?`translate${props.type}(0)`:`translate${props.type}(${props.direction?props.direction:'+'}2rem)`,opacity:isIntersecting?1:0}}>
            {props.children}
        </div>
    )
}

export default Brightup
