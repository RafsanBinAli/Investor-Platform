import { useState, useEffect } from "react";
import "./Feed.css";
import { useNavigate } from "react-router-dom";

const Feed = ({ startupName }) => {
  const [startupData, setStartupData] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const sendData = async () => {
      const response = await fetch("http://localhost:4000/investor-home");
      if (!response.ok) {
        console.log("error", response.status);
      }
      const data = await response.json();
      if (data && data.startupInfo && Array.isArray(data.startupInfo)) {
        setStartupData(data.startupInfo);
      } else {
        console.error("Invalid data structure or missing startupInfo:", data);
      }

      console.log(data);
    };
    sendData();
  }, []);

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleViewDetails = (tinNumber) => {
    navigate(`/startup-info/${tinNumber}`);
  };

  const filteredStartups =
    selectedIndustry === "all"
      ? startupData.filter(
          (startup) =>
            startup.startupName.toLowerCase() === startupName.toLowerCase()
        )
      : startupData
          .filter((startup) => startup.industry === selectedIndustry)
          .filter(
            (startup) =>
              startup.startupName.toLowerCase() === startupName.toLowerCase()
          );

  return (
    <>
      <div className="feed">
        <div className="feed-header">
          <h1 className="feed-header-h1"> Suggested Investments </h1>
          <div className="radiobuttons">
            <label>
              <input
                type="radio"
                value="all"
                checked={selectedIndustry === "all"}
                onChange={handleIndustryChange}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                value="Tech"
                checked={selectedIndustry === "Tech"}
                onChange={handleIndustryChange}
              />
              Tech
            </label>
            <label>
              <input
                type="radio"
                value="Food"
                checked={selectedIndustry === "Food"}
                onChange={handleIndustryChange}
              />
              Food
            </label>
            <label>
              <input
                type="radio"
                value="Sports"
                checked={selectedIndustry === "Sports"}
                onChange={handleIndustryChange}
              />
              Sports
            </label>

            <label>
              <input
                type="radio"
                value="Others"
                checked={selectedIndustry === "Others"}
                onChange={handleIndustryChange}
              />
              Others
            </label>
          </div>
        </div>
        <div className="card-holder">
          {startupName === "" ? (
            // If startupName is an empty string, show all startups
            startupData.map((startup, index) => (
              <div className="card mb-3" key={index}>
                <div className="row g-0">
                  <div className="col-md-4"></div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">{startup.startupName}</h4>
                      <h6 className="startup-founder">
                        {" "}
                        Founder: {startup.startupManagerUsername}
                      </h6>
                      <h6 className="card-tit">{startup.tinNumber}</h6>
                      <p className="card-text"></p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="button">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleViewDetails(startup.tinNumber);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : filteredStartups.length > 0 ? (
            filteredStartups.map((startup, index) => (
              <div className="card mb-3" key={index}>
                <div className="row g-0">
                  <div className="col-md-4"></div>
                  <div className="col-md-8">
                    <div className="card-body d-flex flex-column">
                      <div>
                        <h4 className="card-title">{startup.startupName}</h4>
                        <h6 className="startup-founder">
                          Founder: {startup.startupManagerUsername}
                        </h6>
                        <h6 className="card-tit">{startup.tinNumber}</h6>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Last updated 3 mins ago
                          </small>
                        </p>
                        <div className="details-button ">
                          <button
                            className="btn btn-secondary b"
                            onClick={() => {
                              handleViewDetails(startup.tinNumber);
                            }}
                          >
                            View Details
                          </button>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="nothing-found">
              No startups found with the name{" "}
              <u>
                <b>{startupName}</b>
              </u>
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
