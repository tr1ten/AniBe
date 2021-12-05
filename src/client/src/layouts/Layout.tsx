import {FC} from 'react';
const Layout:FC = ({children})=>{
    return (
        <div className="layout flex flex-col w-full h-full items-center justify-center" >
            {children}
        </div>
    );
}
export default Layout; 