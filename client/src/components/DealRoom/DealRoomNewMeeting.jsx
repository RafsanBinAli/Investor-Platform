import { useContext, useState } from "react";
import "./DealRoomNewMeeting.css";
import UserContext from "../../contexts/userContext";

const DealRoomNewMeeting = () => {
	const { username } = useContext(UserContext);
	const [receiverUsername, setReceiverUsername] = useState("");
	const [meeting, setMeeting] = useState({
		time: "",
		date: "",
		tinNumber: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMeeting({ ...meeting, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`http://localhost:4000/set-meeting/${username}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(meeting),
				}
			);

			if (!response.ok) {
				const responseData = await response.json();
				console.log(responseData.message);

				if (responseData.message === "Startup not found") {
					alert("Please enter a valid startup code");
				} else if (responseData.message === "Some fields are missing") {
					alert("Please fill out all the fields");
				} else {
					console.log("Something went wrong:", responseData.message);
				}
			} else {
				console.log("Successfully Updated");
				alert("Successfully updated");
				setMeeting({ time: "", date: "", tinNumber: "" });
			}

			const fetchData = async () => {
				try {
					const response = await fetch(
						`http://localhost:4000/get-managerName?tinNumber=${meeting.tinNumber}`
					);
					const receiver = await response.json();
					const receiverName = receiver.managerUsername;
					setReceiverUsername(receiverName);

					// Emit the socket event after setting receiverUsername
					// socket.emit("newMeeting", {
					//   sender: username,
					//   receiver: receiverName,
					//   content: "New meeting has been set!",
					// });
				} catch (error) {
					console.log(
						"error in finding Manager name associated with tin number"
					);
				}
			};

			await fetchData();
		} catch (error) {
			console.log("error");
		}
	};

	return (
		<>
			<div className="holder">
				<div className="New-meeting">
					<h1 className="header-meeting"> Set a New Meeting!</h1>
					<div className="form-content">
						<form>
							<label className="label l1"> Time </label>
							<input
								type="time"
								name="time"
								value={meeting.time}
								onChange={handleChange}
							/>

							<br />
							<label className="label l2"> Date</label>
							<input
								type="date"
								name="date"
								value={meeting.date}
								onChange={handleChange}
							/>
							<br />
							<label className="label l3"> Startup Code</label>
							<input
								type="text"
								name="tinNumber"
								placeholder="Code"
								value={meeting.tinNumber}
								onChange={handleChange}
							/>
							<br />
							<br />
							<div className="buttons">
								<button className="btn btn-secondary" onClick={handleSubmit}>
									Set
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default DealRoomNewMeeting;
