import React from 'react'
type ButtonProps={
    children?:React.ReactNode,
    className:string,
    onClick:React.MouseEventHandler<HTMLButtonElement>,
    
}
const Button = ({children,className,onClick}:ButtonProps)=>{
    return (
        <button onClick={onClick} className={'rounded-md border-2 m-2 py-2 w-full sm:w-1/5 transition-colors ' + className}>
            {children}
        </button>
    );
}
export default Button; 