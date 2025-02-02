import { useRef, useContext, useState, useEffect } from "react";
import UserContext from "../../../contexts/userContext";
import { fetchMessages, sendMessage } from "../../../api/message";
import { IMAGES } from "../../../constants/images";
import "./Messaging.css";

const Messaging = ({ messagePartner }) => {
  const [newMessage, setNewMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const { socket } = useContext(UserContext);
  const userType = localStorage.getItem("userType");
  const username = localStorage.getItem("username");
  const messageContainerRef = useRef(null);

  // Only set these values if messagePartner exists
  const senderUsername = username;
  const receiverUsername = messagePartner?.name 
    ? userType === "investor" 
      ? `${messagePartner.name}+manager`
      : userType === "startup" 
        ? `${messagePartner.name}+manager` 
        : messagePartner.name
    : "";

  const sender = senderUsername;
  const modifiedSenderUsername = userType === "investor" 
    ? `${senderUsername}+investor`
    : userType === "startup" 
      ? `${senderUsername}+manager`
      : senderUsername;

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [allMessage]);

  useEffect(() => {
    if (messagePartner?.id) {
      const loadMessages = async () => {
        const result = await fetchMessages(messagePartner.id);
        if (result.success) {
          setAllMessage(result.data);
        } else {
          console.log("Error loading messages:", result.error);
        }
      };
      loadMessages();
    }
  }, [messagePartner]);

  useEffect(() => {
    if (messagePartner?.id && socket) {
      socket.emit("authenticate", username);

      socket.on("serverMessage", ({ sender, content }) => {
        setAllMessage(prev => [...prev, { sender, content, private: true }]);
      });

      return () => {
        socket.off("serverMessage");
      };
    }
  }, [messagePartner, socket, username]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && messagePartner?.id) {
      const result = await sendMessage(newMessage, modifiedSenderUsername, receiverUsername);

      if (result.success) {
        setAllMessage(prev => [...prev, { 
          sender, 
          content: newMessage, 
          private: true 
        }]);

        socket.emit("clientMessage", {
          sender,
          receiver: messagePartner.name,
          content: newMessage
        });
        
        setNewMessage("");
      } else {
        console.log("Failed to send message:", result.error);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      const handlePrivateMessage = ({ sender, content }) => {
        setAllMessage(prev => [...prev, { sender, content, private: true }]);
      };

      socket.on("privateMessage", handlePrivateMessage);

      return () => {
        socket.off("privateMessage", handlePrivateMessage);
      };
    }
  }, [socket]);

  return (
    <div className="messaging">
      {messagePartner?.id ? (
        <>
          <div className="chatter">
            <div className="chatter-header">{messagePartner.name}</div>
            <div className="chatter-type">{messagePartner.type}</div>
          </div>
          <div className="all-the-message" ref={messageContainerRef}>
            <div className="flex-container">
              {allMessage.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.sender !== sender
                      ? "content-div"
                      : "content-div primary-div"
                  }
                >
                  {message.content}
                </div>
              ))}
            </div>
          </div>
          <div className="message-type">
            <input
              type="text"
              placeholder="Message"
              className="message-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="search-icon" onClick={handleSendMessage}>
              <img src={IMAGES.Send} className="send" alt="Send" />
            </div>
          </div>
        </>
      ) : (
        <div className="start-message">
          Choose someone to start messaging!
        </div>
      )}
    </div>
  );
};

export default Messaging;