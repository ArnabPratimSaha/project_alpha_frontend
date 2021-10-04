import React,{useState,useEffect} from 'react'
import './searchBar.css'
import { BiSearchAlt } from 'react-icons/bi';
function SearchBar(props) {
    const [inputValue, setInputValue] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    useEffect(() => {
        if (props.onChange) {
            props.onChange(inputValue)
        }
    }, [inputValue])
    return (
        <div className='searchbar-fulldiv' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}>
            <BiSearchAlt className='searchbar-icon'/>
            <div className='searchbar-input-div' >
                <input style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}} value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} onFocus={()=>{setIsInputFocused(true)}} onBlur={()=>{setIsInputFocused(false)}}/>
                <span style={{transform:isInputFocused || inputValue!=''?'translateY(-150%)':'translateY(-50%)'}}>{`Search by server`}</span>
            </div>
        </div>
    )
}

export default SearchBar
