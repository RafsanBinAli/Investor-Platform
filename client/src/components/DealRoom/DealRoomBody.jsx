import { useState } from "react";
import "./DealRoomBody.css";
import DealRoomNewMeeting from "./DealRoomNewMeeting";
import DealRoomSearch from "./DealRoomSearch";
import MeetingDetails from "./MeetingDeatils";

const DealRoomFeed = () => {
	const [startupCode, setStartupCode] = useState("");
	const [scheduledMeeting, setScheduledMeeting] = useState(null);

	

	return (
		<>
			<div className="main">
                
				<DealRoomNewMeeting/>
				<DealRoomSearch />
				
				
                </div>
					
				
			
		</>
	);
};
export default DealRoomFeed;
