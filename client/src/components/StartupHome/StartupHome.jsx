import { useContext } from "react";

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