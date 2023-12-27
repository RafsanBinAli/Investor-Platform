import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./InvestorHome.css";
import TopBar from "./InvestorHome/TopBar/TopBar";
import RightBar from "./InvestorHome/RightBar/RightBar";
import Feed from "./InvestorHome/Feed/Feed";
import DealRoom from "./DealRoom/DealRoom";
import Body from "./InvestorHome/Body/Body";
import NothingFound from "./NothingFound";

function InvestorHome() {
	return (
		
			<>
				
				<div className="main-contain">
					<Routes>
						<Route path="/" element={<Body />} />
						
						<Route path="/investor-forum" element={<RightBar />} />
						
					</Routes>
				</div>
			</>
		
	);
}

export default InvestorHome;
