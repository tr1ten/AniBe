import { ReactNode } from "react";

type CardProps={
    children:ReactNode,
    redirectTo:string,
}
const Card = ({children,redirectTo}:CardProps)=>{
    return (
        <a href={redirectTo} className="rounded-md flex flex-col justify-center shadow-md bg-white m-1 p-2 w-2/5 sm:w-1/6 hover:translate-y-2 element-card border-b-2 border-purple-600">
            {children}
        </a>

    );
}
export default Card; 