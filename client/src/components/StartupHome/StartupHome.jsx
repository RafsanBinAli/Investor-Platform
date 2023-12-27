import { useContext } from "react";
import TopBar from "../InvestorHome/TopBar/TopBar";
import Body from "./Body";
import Profile from "./Profile";
import "./StartupHome.css"
import UserContext from "../../contexts/userContext";

const StartupHome=()=>{

    const {username, setUser} = useContext(UserContext);
   
    return(
        <>
        
        <div className="startup">
            <Profile/>
            <Body/>

        </div>
        </>
    )
}

export default StartupHome;