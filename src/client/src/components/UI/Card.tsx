import { ReactNode } from "react";

type CardProps={
    children:ReactNode,
    redirectTo:string,
}
const Card = ({children,redirectTo}:CardProps)=>{
    return (
        <a href={redirectTo} className="rounded-md shadow-md bg-white m-1 p-2 w-1/5 hover:translate-y-2 element-card">
            {children}
        </a>

    );
}
export default Card; 