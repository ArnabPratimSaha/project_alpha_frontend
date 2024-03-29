import React,{useRef,useEffect,useState} from 'react'
import './brightup.css'
function Brightup(props) {
    const component = useRef()
    const isDone=useRef(false);
    const [isIntersecting, setIsIntersecting] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isDone.current) {
                isDone.current = true;
                if(props.delay)
                {
                    setIsIntersecting(true);
                    setTimeout(() => {
                    }, props.delay);
                }
                else
                    setIsIntersecting(true);
            }
        });
        observer.observe(component.current)
        return ()=>{component.current && observer.unobserve(component.current);}
    }, [])

    return (
        <div ref={component} className='brightup-full-div' style={{transform:isIntersecting?`translate${props.type}(0)`:`translate${props.type}(${props.direction?props.direction:'+'}2rem)`,opacity:isIntersecting?1:0}}>
            {props.children}
        </div>
    )
}

export default Brightup
