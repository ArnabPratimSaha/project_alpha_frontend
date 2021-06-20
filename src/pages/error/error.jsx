import react,{useEffect, useState} from "react";
import "./error.css";
import {useParams} from 'react-router-dom';

const Error=props=>
{
    const [code, setCode] = useState(useParams().code)
    const [message, setMessage] = useState('Unknown Error')

    useEffect(()=>{
        if(code===404)
            setMessage('Not Found')
        else if(code===403)
            setMessage('Forbidden')
        else if(code===400)
            setMessage('Bad Request')
        else if(code===500)
            setMessage('Internal Server Error')
        else 
            setMessage('Unknow Error')
    },[])
    return(
        <div>
            <div className="error-div">
                <i className="far fa-frown fa-10x" ></i>
                <h1>{code}</h1>
                <h2>Page not found</h2>
                <p>{message}</p>
                <h6>Go to</h6><a href="/home"> home </a><h6>page </h6>
            </div>
        </div>
    )
}
export default Error;
