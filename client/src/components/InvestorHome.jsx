import React from "react";
import { BrowserRouter as  Routes, Route } from "react-router-dom";
import "./InvestorHome.css";

import RightBar from "./InvestorHome/RightBar/RightBar";

import Body from "./InvestorHome/Body/Body";

function InvestorHome() {
  return (
    <>
      <div className="main-contain">
        <Body/>
      </div>
    </>
  );
}

export default InvestorHome;
