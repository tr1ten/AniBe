import { useState,useEffect } from "react";
import ConnectionCircle from "./ConnectionCircle";
const Logo = ()=>{
    const [isConnnected, setisConnnected] = useState(false)
    useEffect(() => {
        fetch("http://localhost:3000/").then((res)=>setisConnnected(res.status===200)).catch((err)=>console.log("error occured during pinging api ",err))
    }, [])
    return (
        <div className="p-2 m-2 text-center flex items-center">
            <ConnectionCircle isConnected={isConnnected} />
            <h1 className="text-3xl">
                Anibe
            </h1>
            <ConnectionCircle isConnected={isConnnected} />
        </div>
    );
}
export default Logo; 