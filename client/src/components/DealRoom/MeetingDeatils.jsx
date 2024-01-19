// MeetingDetails.jsx
import "./MeetingDetails.css";

const MeetingDetails = ({ ab }) => {
	if (!ab || !ab.meetingData) {
		// If meetingData or date is not defined, return some default content or handle it accordingly
		return (
			<div className="meeting-details">
				<h1 className="headerh1"> Meeting Details</h1>
				<p> No meeting data available</p>
			</div>
		);
	}

	const meetingTime = new Date(ab.meetingData);
	const timeString = meetingTime.toLocaleTimeString();
	const dateString = meetingTime.toLocaleDateString();

	return (
		<div className="meeting-details">
			<h1 className="headerh1"> Meeting Details</h1>
			<br />
			<p className="p"> Time: {timeString}</p>
			<p className="p"> Date: {dateString} </p>
			<a> Join the Meeting?</a>
		</div>
	);
};

export default MeetingDetails;
