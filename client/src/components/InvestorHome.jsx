import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./InvestorHome.css";

import RightBar from "./InvestorHome/RightBar/RightBar";

import Body from "./InvestorHome/Body/Body";


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
