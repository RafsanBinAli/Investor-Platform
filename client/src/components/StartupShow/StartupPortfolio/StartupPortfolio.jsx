import { useEffect, useState } from "react";
import "./StartupPortfolio.css";
import { useParams } from "react-router-dom";
const StartupPortfolio = () => {
	const [managerInfo, setManagerInfo] = useState({
		city: "",
		Username: "",
		fullName: "",
		email: "",
		password: "",
		phone: "",
		NID: "",
		highestDegree: "",
		major: "",
		expertArea: "",
		startups: [],
	});
	const { tinNumber } = useParams();
	useEffect(() => {
		const sendData = async () => {
			const response = await fetch(
				`http://localhost:4000/startup/profile/${tinNumber}`
			);
			const data = await response.json();
			if (!response.ok) {
				console.log("error status", response.status);
			}
			console.log(data);
			setManagerInfo(data);
		};
		sendData();
	}, [tinNumber]);
	return (
		<>
			<div className="startup-portfolio">
				<div className="portfolio">
					<div className="pic"></div>
					<div className="info">
						<div className="username"> {managerInfo.Username}</div>
						<div className="porichoy">
							<div className="information-para"> Full Name: </div>{" "}
							<p> {managerInfo.fullName}</p>
						</div>
						<div className="porichoy">
							<div className="information para"> City: </div>{" "}
							<p> {managerInfo.city}</p>
						</div>
						<div className="porichoy">
							<div className="informaion-para">Highest Degree :</div>
							<p> {managerInfo.highestDegree}</p>
						</div>
						<div className="porichoy">
							<p className="information para"> Major: </p>{" "}
							<p> {managerInfo.major}</p>
						</div>
						<div className="porichoy">
							{" "}
							<p className="information-para">
								{" "}
								Startups:{" "}
								{managerInfo.startups
									.map((startup) => startup.startupName)
									.join(", ")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default StartupPortfolio;
