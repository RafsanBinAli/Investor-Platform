import { useState } from "react";
import { setMeeting } from "../../api/meeting";
import "./DealRoomNewMeeting.css";

const DealRoomNewMeeting = () => {
  const username = localStorage.getItem("username");
  const [meeting, setMeetingData] = useState({
    time: "",
    date: "",
    tinNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({ ...meeting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await setMeeting(username, meeting);
    
    if (!result.success) {
      switch (result.message) {
        case "Startup not found":
          alert("Please enter a valid startup code");
          break;
        case "Some fields are missing":
          alert("Please fill out all the fields");
          break;
        default:
          console.log("Something went wrong:", result.message);
      }
      return;
    }


    // Reset form and show success message
    alert("Successfully updated");
    setMeetingData({ time: "", date: "", tinNumber: "" });
  };

  return (
    <div className="holder">
      <div className="New-meeting">
        <h1 className="header-meeting">Set a New Meeting!</h1>
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <label className="label l1">Time</label>
            <input
              type="time"
              name="time"
              value={meeting.time}
              onChange={handleChange}
            />
            <br />
            <label className="label l2">Date</label>
            <input
              type="date"
              name="date"
              value={meeting.date}
              onChange={handleChange}
            />
            <br />
            <label className="label l3">Startup Code</label>
            <input
              type="text"
              name="tinNumber"
              placeholder="Code"
              value={meeting.tinNumber}
              onChange={handleChange}
            />
            <br />
            <br />
            <div className="buttons">
              <button type="submit" className="btn btn-secondary">
                Set
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DealRoomNewMeeting;