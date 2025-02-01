import "./DealRoomSearch.css";

import MeetingDetails from "./MeetingDeatils";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";

const DealRoomSearch = () => {
  const { startupCode, setStartupCode } = useContext(UserContext);
  const [code, setCode] = useState("");
  const [meetingData, setMeetingData] = useState([]);

  const handleChange = async (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/meeting-searched/${startupCode}`
        );
        const data = await response.json();
        setMeetingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (startupCode) {
      fetchData();
    }
  }, [startupCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/meeting-searched/${code}`
      );
      if (response.ok) {
        alert("Meeting Found !");
      }
      if (!response.ok) {
        alert("No Meeting!");
      }
      const data = await response.json();
      setMeetingData(data);
    } catch (error) {
      console.log("error found", error);
    }
  };

  return (
    <>
      <div className="search">
        <div className="search-contain">
          <div className="searh-header">
            <h1 className="headerh1">
              {" "}
              Search to know if a meeting was already fixed!{" "}
            </h1>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Code "
              name="code"
              onChange={handleChange}
            />
            <button className="btn btn-secondary" onClick={handleSubmit}>
              Search
            </button>
          </div>

          <MeetingDetails ab={meetingData} />
        </div>
      </div>
    </>
  );
};

export default DealRoomSearch;
