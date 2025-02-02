import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getConversations } from "../../../api/message";
import { IMAGES } from "../../../constants/images";
const Dashboard = ({ handlePerson, isConversationCreated }) => {

  const senderUsername = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");
  const [conversationNames, setConversationNames] = useState([]);

  const handleShowConvo = (person) => {
    handlePerson(person);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { success, data, error } = await getConversations(senderUsername);

      if (success) {
        setConversationNames(data);
      } else {
        console.error("Error fetching conversation names:", error);
      }
    };

    fetchData();
  }, [ isConversationCreated,senderUsername]);

  return (
    <div className="dashboard">
      <div className="inside-dash">
        <div className="profile-box">
          <img src={IMAGES.INVESTOR} className="profile-pic" alt="Profile" />
          <div className="my-profile">
            <div className="name">{senderUsername}</div>
            <div className="type">{userType}</div>
          </div>
        </div>

        <div className="message-dash">
          <h5 className="message-dash-header">
            <u>Recent Messages:</u>
          </h5>
          {conversationNames.map((person) => (
            <div
              key={person.id}
              className="contacts"
              onClick={() => handleShowConvo(person)}
            >
              <img
                src={IMAGES.INVESTOR}
                className="profile-pic"
                alt="Profile"
              />
              <p className="contact-name">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
