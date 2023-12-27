import DealRoomFeed from "./DealRoomBody";
import TopBar from "../InvestorHome/TopBar/TopBar";
import "./DealRoom.css"

const DealRoom = () =>{
    return(
        <>
       
        <div className="main-container">
            <DealRoomFeed />
        </div>
        </>
    )
}

export default DealRoom;