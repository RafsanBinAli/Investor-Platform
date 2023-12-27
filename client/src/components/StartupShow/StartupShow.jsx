import TopBar from "../InvestorHome/TopBar/TopBar";
import DefaultNavbar from "../NavBar/DefaultNavbar";
import StartupNavbar from "../NavBar/StartupNavbar";
import StartupBody from "./StartupInfoBody/startupBody";
import StartupPortfolio from "./StartupPortfolio/StartupPortfolio";
import "./StartupShow.css";

const StartupShow = () => {
	return (
		<>
        
			<div className="startup">
				<StartupPortfolio />
				<StartupBody />
			</div>
		</>
	);
};

export default StartupShow;
