import {useState } from "react";
import Card from "../UI/Card";
import {Result} from "../../interfaces/index"
import PlaceHolder from "../UI/Placeholder";
type ElementCardProps= Result & {
    children?:React.ReactNode,
    
}
const ElementCard = ({label,imgUrl,linkUrl}:ElementCardProps)=>{
    const fallBackImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    const [img_url, setimgUrl] = useState(imgUrl);
    const [isLoadingImage, setisLoadingImage] = useState(true)
    const onLoad = ()=>{
        setisLoadingImage(false)
    }
    return (
        <Card redirectTo={linkUrl}>
            {isLoadingImage && <PlaceHolder />}
            <img onLoad={onLoad} loading="lazy" onError={(e)=>{setimgUrl(fallBackImage)}} src={img_url} alt="" />
            
            <h3 className="text-lg text-center">{label}</h3>
        </Card>
    );
}
export default ElementCard; 