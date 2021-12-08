import {BsHeartFill} from "react-icons/bs"
import {AiOutlineGithub} from "react-icons/ai"
const Footer:React.FC = ()=>{
    return (
        <footer className="bg-gray-900 text-white text-center w-full p-4 m-0">
            <h3>If you   {<BsHeartFill className="text-purple-600" style={{ margin:"0.4rem",display:"inline"}} />}   this , please consider starring on {<a href="https://github.com/tr1ten/AniBe"><AiOutlineGithub style={{ marginLeft:"0.3rem",fontSize:"1.3rem",display:"inline"}}/> </a>} {'>_<'} </h3>
        </footer>
    );
}
export default Footer; 