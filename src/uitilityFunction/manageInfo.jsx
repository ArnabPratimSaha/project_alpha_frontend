export function getInfo(dataName) {
    return localStorage.getItem(dataName)
}

export const setInfo=(dataName,data)=>{
    localStorage.setItem(dataName,data);
}
export const removeItem=(dataName)=>{
    localStorage.removeItem(dataName);
}