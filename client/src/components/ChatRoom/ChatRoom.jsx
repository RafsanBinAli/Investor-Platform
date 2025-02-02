import Dashboard from "./DashBoard/Dashboard";
import Messaging from "./Messaging/Messaging";
import "./ChatRoom.css";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/userContext";

const ChatRoom = () => {
  const [messagePartner, setMessagePartner] = useState([]);
  const { chatManagerName } =
    useContext(UserContext);
    const username= localStorage.getItem('username')

  const handlePerson = (person) => {
    setMessagePartner(person);
  };

  useEffect(() => {
    console.log(chatManagerName);
    console.log(messagePartner.length);
    try {
      const fetchData = async () => {
        if (messagePartner.length === 0) {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-convo`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              investor: username,
              startupManager: chatManagerName,
            }),
          });
          console.log(response);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="chatroom">
      <Dashboard handlePerson={handlePerson} />
      <Messaging messagePartner={messagePartner} />
    </div>
  );
};
export default ChatRoom;
