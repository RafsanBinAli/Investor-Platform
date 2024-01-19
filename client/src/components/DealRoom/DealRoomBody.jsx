import { useState } from "react";
import "./DealRoomBody.css";
import DealRoomNewMeeting from "./DealRoomNewMeeting";
import DealRoomSearch from "./DealRoomSearch";

const DealRoomFeed = () => {
	return (
		<>
			<div className="main">
				<DealRoomNewMeeting />
				<DealRoomSearch />
			</div>
		</>
	);
};
export default DealRoomFeed;
