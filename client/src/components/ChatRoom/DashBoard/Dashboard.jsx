import { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import InvestorImage from "./investor.jpg";
import UserContext from "../../../contexts/userContext";

const Dashboard = ({ handlePerson }) => {
  const { userType, username, managerUsername } = useContext(UserContext);
  const [conversationNames, setConversationNames] = useState([]);

  var senderUsername;
  if (userType === "investor") {
    senderUsername = username;
  } else if (userType === "startup") {
    senderUsername = managerUsername;
  }
  const handleShowConvo = (person) => {
    handlePerson(person);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("In FetchData");
        const response = await fetch(
          `http://localhost:4000/conversations?username=${senderUsername}`
        );

        if (response.ok) {
          const names = await response.json();
          console.log(names.otherNames);
          setConversationNames(names.otherNames);
        } else {
          const errorData = await response.text();
          console.log(
            "Error fetching conversation names:",
            response.status,
            errorData
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [senderUsername]);

  return (
    <div className="dashboard">
      <div className="inside-dash">
        <div className="profile-box">
          <img src={InvestorImage} className="profile-pic" />
          <div className="my-profile">
            <div className="name">{senderUsername} </div>
            <div className="type"> {userType} </div>
          </div>
        </div>

        <div className="message-dash">
          <h5 className="message-dash-header">
            {" "}
            <u>Recent Messages:</u>
          </h5>
          {conversationNames.map((person) => (
            <div
              key={person.id}
              className="contacts"
              onClick={() => handleShowConvo(person)}
            >
              <img src={InvestorImage} className="profile-pic" alt="Profile" />
              <p className="contact-name"> {person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
