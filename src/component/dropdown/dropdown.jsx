import React,{useState,useEffect} from 'react'
import './dropdown.css';
import { AiOutlineCaretDown } from 'react-icons/ai';
function Dropdown(props) {
    const [drawer, setDrawer] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0)
    const handleDropdownClick=()=>{
        setDrawer((s)=>!s);
    }
    useEffect(() => {
        if(props.onChange)
            props.onChange(selectedIndex)
    }, [selectedIndex])
    return (
        <button className={`dropdown-fulldiv ${props.className}`} onBlur={()=>{setDrawer(false)}}>
            <div className='dropdown-box' onClick={handleDropdownClick}  style={{borderColor:props.mode===props.MODETYPE.DARK?'#cacaca':'#555',color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}>
                <div className='dropdown-box-selecteditem'>
                    <span>{props.options && props.options[selectedIndex]}</span>
                </div>
                <AiOutlineCaretDown className='dropdown-icons'/>
            </div>
            <div className='dropdown-option' style={{display:drawer?'block':'none',background:props.mode===props.MODETYPE.DARK?'#666':'#fff',color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}>
                {props.options && props.options.map((e,index)=>{
                    return (
                        <div key={index} className={`dropdown-option-item ${index===props.options.length-1 && 'dropdown-option-item__last'}`}
                             onClick={()=>{
                                 setSelectedIndex(index)
                                 setDrawer(false)
                                 }}>
                            <span>{e}</span>
                        </div>
                    )
                })}
            </div>
        </button>
    )
}

export default Dropdown