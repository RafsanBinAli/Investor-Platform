import Dashboard from "./DashBoard/Dashboard";
import Messaging from "./Messaging/Messaging";
import "./ChatRoom.css";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/userContext";

const ChatRoom = () => {
	const [messagePartner, setMessagePartner] = useState([]);
	const { username, chatManagerName, setChatManagerName } =
		useContext(UserContext);

	const handlePerson = (person) => {
		setMessagePartner(person);
	};

	useEffect(() => {
		console.log(chatManagerName);
		console.log(messagePartner.length);
		try {
			const fetchData = async () => {
				if (messagePartner.length === 0) {
					const response = await fetch(`http://localhost:4000/create-convo`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							investor: username,
							startupManager: chatManagerName,
						}),
					});
					console.log(response);
				}
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
	});
	return (
		<div className="chatroom">
			<Dashboard handlePerson={handlePerson} />
			<Messaging messagePartner={messagePartner} />
		</div>
	);
};
export default ChatRoom;
