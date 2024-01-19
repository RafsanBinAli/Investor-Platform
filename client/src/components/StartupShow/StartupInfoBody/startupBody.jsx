import { useNavigate, useParams } from "react-router-dom";
import "./startupBody.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/userContext";

const StartupBody = ({}) => {
	const navigate=useNavigate();
	const {startupCode,setStartupCode,chatManagerName,setChatManagerName}=useContext(UserContext)
	
	const [startupInfo, setStartupInfo] = useState({
		startupName: "",
		industry: "",
		foundingDate: "",
		location: "",
		tinNumber: "",
		cofounderName: "",
		coOccupation: "",
		NID: "",
		initialFund: "",
		totalRevenue: "",
		fundingNeeded: "",
		goals: "",
		motivation: "",
		briefExplain: "",
		startupManagerUsername: "",
	});
	const [managerInfo, setManagerInfo] = useState("");
	const { tinNumber } = useParams();
	console.log(tinNumber);
	

	useEffect(() => {
		const sendData = async () => {
			const response = await fetch(
				`http://localhost:4000/startup-info/${tinNumber}`
			);
			const data = await response.json();
			if (!response.ok) {
				console.log("error status", response.status);
			}
			console.log(data);
			setStartupInfo(data);
			
			
			
		};

		sendData();
	}, [tinNumber]);

	const handleClick=()=>{
		setStartupCode(tinNumber)
		navigate('/deal-room')
	}
	const handleClickToChat=()=>{
		setChatManagerName(startupInfo.startupManagerUsername)
		navigate('/chat-room')
	}

	return (
		<>
			<div className="startupbody">
				<div className="abc">
					<div className="startupDetails">
						<div className="upper-portion">
							<h1 className="startupName-header">{startupInfo.startupName} </h1>
                            <div className="button-holder">
                                <button className="btn btn-secondary a" onClick={handleClick}> Go to Deal Room!</button>
								<button className="btn btn-secondary a" onClick={handleClickToChat}> Go to Chat Room!</button>
                            </div>
							
						</div>
						<div className="startupDetails-more">
							<div className="individual">
								<p className="labe">Founder: </p>
								<p className="data">{startupInfo.startupManagerUsername}</p>
							</div>
							<div className="individual">
								<p className="labe">Co-founder: </p>
								<p className="data">{startupInfo.cofounderName}</p>
							</div>
							<div className="individual">
								<p className="labe">Founded on: </p>
								<p className="data">{startupInfo.foundingDate}</p>
							</div>
							<div className="individual">
								<p className="labe">Industry: </p>
								<p className="data">{startupInfo.industry}</p>
							</div>
							<div className="individual">
								<p className="labe">Goals: </p>
								<p className="data">{startupInfo.goals}</p>
							</div>
							<div className="individual">
								<p className="labe">Motivation: </p>
								<p className="data">{startupInfo.motivation}</p>
							</div>
							<div className="individual">
								<p className="labe">Brief Explain: </p>
								<p className="data">{startupInfo.briefExplain}</p>
							</div>
						</div>
					</div>

					<div className="fundingDetails">
						<h3 className="fundingDetails-header"><u> Funding Details:</u></h3>
						<div className="fund">
							<p className="labe">Initial Fund: </p>
							<p className="data">{startupInfo.initialFund} BDT</p>
						</div>
						<div className="fund">
							<p className="labe">Total Revenue: </p>
							<p className="data">{startupInfo.totalRevenue} BDT</p>
						</div>
						<div className="fund">
							<p className="labe">Funding Needed: </p>
							<p className="data a"> <u>{startupInfo.fundingNeeded}  </u>BDT</p>
						</div>
						
					</div>
				</div>
			</div>
		</>
	);
};
export default StartupBody;
