
type ConnectionCircleProps={
    isConnected: boolean,
    
}
const ConnectionCircle = ({isConnected}:ConnectionCircleProps)=>{
    let classname = "p-2 rounded-full m-2 inline-block w-2 h-2 ";
    if(isConnected){
        classname += "bg-green-600"
    }
    else{
        classname +="bg-red-600"
    }
    return (<div className={classname} />);
}
export default ConnectionCircle; 