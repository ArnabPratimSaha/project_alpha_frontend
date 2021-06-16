import React from 'react'

export function configButtonColor(isActive,mode) {
    if(isActive)
    {
        return {
            color:mode==='dark'?'#fff':'#333',
            background:mode==='dark'?'#435055':'#cacaca',
        }
    }
    return {
        color:mode==='dark'?'#fff':'#333',
        background:mode==='dark'?'#444':'#fff'
    }
}
