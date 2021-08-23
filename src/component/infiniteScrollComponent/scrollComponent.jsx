import React,{useRef,useEffect,useState} from 'react'
import './scrollComponent.css'

function ScrollComponent(props) {
    const trigger = useRef()
    const [hasMore, setHasMore] = useState(props.hasMore)
    const state = useRef(false)
    useEffect(() => {
        state.current=props.hasMore;
        setHasMore(props.hasMore)
    }, [props.hasMore])
    const intersection=new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting)
        {
            if(props.onIntersect && state.current)
            {
                props.onIntersect()
            }
        }
    })
    useEffect(() => {
        intersection.observe(trigger.current)
        return () => {
        }
    }, [])
    return (
        <div className='scrollComponent-fulldiv'>
            <div className={`scrollcomponent-outputdiv ${props.className}`}>
                {props.children}
            </div>
            <div ref={trigger} className='scrollcomponent-triggerdiv' style={{height:props.triggerHeight?props.triggerHeight:'2rem',display:hasMore?'block':'none'}} ></div>
        </div>
    )
}

export default ScrollComponent
