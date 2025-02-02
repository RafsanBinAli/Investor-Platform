import Dashboard from "../components/ChatRoom/DashBoard/Dashboard";
import Messaging from "../components/ChatRoom/Messaging/Messaging";
import { useState, useEffect } from "react";
import { createConversation } from "../api/message"; // Import the function
import { useLocation } from "react-router-dom";

const ChatRoom = () => {
  const [messagePartner, setMessagePartner] = useState([]);
  const location = useLocation();
  const { chatManagerName } = location.state || {};
  const [isConversationCreated, setIsConversationCreated] = useState(false); // New state to trigger refetch

  const handlePerson = (person) => {
    setMessagePartner(person);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (messagePartner.length === 0) {
        if (chatManagerName) {
          await createConversation(chatManagerName);
          setIsConversationCreated(true); 
        }
      }
    };

    fetchData();
  }, [chatManagerName, messagePartner]);

  return (
    <div className="chatroom">
      <Dashboard handlePerson={handlePerson} isConversationCreated={isConversationCreated} />
      <Messaging messagePartner={messagePartner} />
    </div>
  );
};

export default ChatRoom;
