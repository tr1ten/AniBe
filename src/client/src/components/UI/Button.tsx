import React from 'react'
type ButtonProps={
    children?:React.ReactNode,
    className:string,
    onClick:React.MouseEventHandler<HTMLButtonElement>,
    
}
const Button = ({children,className,onClick}:ButtonProps)=>{
    return (
        <button onClick={onClick} className={'rounded-md border-2 m-2 p-2 ' + className}>
            {children}
        </button>
    );
}
export default Button; 