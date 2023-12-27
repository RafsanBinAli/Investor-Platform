import { useState, useEffect, useContext } from "react";
import TopBar from "../InvestorHome/TopBar/TopBar";
import DefaultNavbar from "../NavBar/DefaultNavbar";
import "./Profile.css";
import pic from "./man.png";
import UserContext from "../../contexts/userContext";

const Profile = () => {
	const { managerUsername } = useContext(UserContext);
	const [userData, setUserData] = useState({
		Username: "",
		city: "",
		fullName: "",
	});

	useEffect(() => {
		const sendData = async () => {
			const response = await fetch(
				`http://localhost:4000/startup/home/${managerUsername}`
			);
			if (!response.ok) {
				console.log("error", response.status);
			}

			const data = await response.json();
			console.log(data);
			setUserData(data);
		};

		sendData();
	}, [managerUsername]);
	return (
		<>
			<div className="profile-holder">
				<div className="Profile">
					<div className="pic">
						
					</div>
					<div className="info">
						<p className="p"> Username:{managerUsername}</p>
						<p className="p"> Full Name: {userData.fullName}</p>
						<p className="p"> City: {userData.city}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
