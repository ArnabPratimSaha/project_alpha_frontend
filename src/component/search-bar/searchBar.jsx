import React,{useState} from 'react'
import './searchBar.css'
import { BiSearchAlt } from 'react-icons/bi';
function SearchBar(props) {
    const [inputValue, setInputValue] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    return (
        <div className='searchbar-fulldiv' style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}}>
            <BiSearchAlt className='searchbar-icon'/>
            <div className='searchbar-input-div' >
                <input style={{color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}} onChange={(e)=>{setInputValue(e.target.value)}} onFocus={()=>{setIsInputFocused(true)}} onBlur={()=>{setIsInputFocused(false)}}/>
                <span style={{transform:isInputFocused || inputValue!=''?'translateY(-150%)':'translateY(-50%)'}}>{`Search by server`}</span>
            </div>
        </div>
    )
}

export default SearchBar
