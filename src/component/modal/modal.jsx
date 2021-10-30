import React,{useState,useEffect} from 'react';
import './modal.css';
import { AiOutlineCheck } from 'react-icons/ai';
function Modal(props) {
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if(props.isOpen)
            setIsOpen(true);
        return () => {
        }
    }, [props.isOpen])
    const handleSubmit=()=>{
        if(props.onClick)
        {
            props.onClick(input)
            setIsOpen(false);
            setInput('');
        }
    }
    return (
        <div className='modal-fulldiv' style={{transform:`translateY(${isOpen?'0':'-100%'})`}}>
            <div className='modal-outline' style={{backgroundColor:props.mode===props.MODETYPE.DARK?'#333':'#a8a8a8'}}>
                <div className='modal-inner-div' style={{borderColor:props.mode===props.MODETYPE.DARK?'#a8a8a8':'#222'}}>
                    <div className='modal-inner-input-div'>
                        <input type='text' style={{borderColor:props.mode===props.MODETYPE.DARK?'#a8a8a8':'#222',color:props.mode===props.MODETYPE.DARK?'#fff':'#222'}} value={input} onChange={(v)=>{setInput(v.target.value);}}></input>
                        <button style={{color:props.mode===props.MODETYPE.DARK?'#cacaca':'#333'}} onClick={handleSubmit}><AiOutlineCheck/></button>
                    </div>
                    <div className='modal-inner-text-div'>
                        <h1 style={{color:props.mode===props.MODETYPE.DARK?'#cacaca':'#333'}}>{props.text}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
