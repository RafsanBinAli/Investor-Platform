// src/components/StartupBody/StartupBody.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStartupInfo } from "../../api/startupApi";
import "./startupBody.css";

const StartupBody = () => {
  const navigate = useNavigate();
  const { tinNumber } = useParams();
  const userType = localStorage.getItem("userType");
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

  useEffect(() => {
    const loadStartupInfo = async () => {
      const result = await fetchStartupInfo(tinNumber);
      if (result.success) {
        setStartupInfo(result.data);
      } else {
        console.error("Failed to load startup info:", result.error);
      }
    };

    loadStartupInfo();
  }, [tinNumber]);

  const handleClick = () => {
    navigate("/deal-room");
  };

  const handleClickToChat = () => {
    navigate("/chat-room", {
      state: { chatManagerName: startupInfo.startupManagerUsername },
    });
  };

  return (
    <div className="startupbody">
      <div className="abc">
        <div className="startupDetails">
          <div className="upper-portion">
            <h1 className="startupName-header">{startupInfo.startupName}</h1>
            {userType === "investor" && (
              <div className="button-holder">
                <button className="btn btn-secondary a" onClick={handleClick}>
                  Go to Deal Room!
                </button>
                <button className="btn btn-secondary a" onClick={handleClickToChat}>
                  Go to Chat Room!
                </button>
              </div>
            )}
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
          <h3 className="fundingDetails-header">
            <u>Funding Details:</u>
          </h3>
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
            <p className="data a">
              <u>{startupInfo.fundingNeeded}</u> BDT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupBody;