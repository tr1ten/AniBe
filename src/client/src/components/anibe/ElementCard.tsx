import { useState } from "react";
import Card from "../UI/Card";
import {Result} from "../../interfaces/index"
type ElementCardProps= Result & {
    children?:React.ReactNode,
    
}
const ElementCard = ({label,imgUrl,linkUrl}:ElementCardProps)=>{
    const fallBackImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    const [img_url, setimgUrl] = useState(imgUrl);
    return (
        <Card redirectTo={linkUrl}>
            <img onError={(e)=>{setimgUrl(fallBackImage)}} src={img_url} alt="" />
            <h3 className="text-lg text-center">{label}</h3>
        </Card>
    );
}
export default ElementCard; 