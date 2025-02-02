import { useEffect, useState } from "react";
import { searchMeetings } from "../../api/meeting";
import MeetingDetails from "./MeetingDeatils";
import "./DealRoomSearch.css";

const DealRoomSearch = () => {
  const [code, setCode] = useState("");
  const [meetingData, setMeetingData] = useState([]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      if (code) {
        const result = await searchMeetings(code);
        if (result.success) {
          setMeetingData(result.data);
        }
      }
    };

    fetchMeetings();
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await searchMeetings(code);
    alert(result.message);
    
    if (result.success) {
      setMeetingData(result.data);
    }
  };

  return (
    <div className="search">
  <div className="search-contain">
    <div className="searh-header">
      <h1 className="headerh1">
        Search to know if a meeting was already fixed!
      </h1>
    </div>
    <div className="input">
      <input
        type="text"
        placeholder="Code"
        name="code"
        value={code}
        onChange={handleChange}
      />
      <i className="fas fa-search" onClick={handleSubmit}></i>
    </div>
    <MeetingDetails ab={meetingData} />
  </div>
</div>
  );
};

export default DealRoomSearch;