import { useRef, useContext, useState, useEffect } from "react";
import "./Messaging.css";
import UserContext from "../../../contexts/userContext";
import { fetchMessages, sendMessage } from "../../../api/message";

const Messaging = ({ messagePartner }) => {

  const Send="https://i.ibb.co.com/FbKzLSyY/send.png" ;
  const [newMessage, setNewMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  const { socket } = useContext(UserContext);

  const userType = localStorage.getItem("userType");
  const username = localStorage.getItem("username");

  var senderUsername = username;
  var receiverUsername = messagePartner.name;

  // Check the userType and set the sender accordingly

  var sender = senderUsername;
  if (userType === "investor") {
    receiverUsername = `${receiverUsername}+manager`;
    senderUsername = `${senderUsername}+investor`;
  } else if (userType === "startup") {
    receiverUsername = `${receiverUsername}+manager`;
    senderUsername = `${senderUsername}+manager`;
  }
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message container when the component mounts
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [allMessage]);

  useEffect(() => {
    if (messagePartner && messagePartner.id !== undefined) {
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
    if (messagePartner && messagePartner.id !== undefined) {
      // Authenticate the user
      const sender = username;
      socket.emit("authenticate", sender);

      // Listen for server-relayed messages
      socket.on("serverMessage", ({ sender, content }) => {
        // Update your state or perform any other actions with the received message
        setAllMessage((prevMessages) => {
          const newMessages = [
            ...prevMessages,
            { sender, content, private: true },
          ];

          return newMessages;
        });
      });

      // Cleanup on component unmount
      return () => {
        socket.off("serverMessage");
        // Disconnect the Socket.IO connection
      };
    }
  }, [messagePartner, userType, username]);

  const handleSendMessage = async () => {
    if (newMessage !== "") {
      
      const result = await sendMessage(newMessage, senderUsername, receiverUsername);

      if (result.success) {
        setAllMessage((prevMessages) => [
          ...prevMessages,
          { sender, content: newMessage, private: true },
        ]);

        socket.emit("clientMessage", {
          sender: sender,
          receiver: messagePartner.name,
          content: newMessage,
        });
      } else {
        console.log("Failed to send message:", result.error);
      }
      
      setNewMessage("");
    }
  };
  useEffect(() => {
    const handlePrivateMessage = ({ sender, content }) => {
      // Handle incoming private messages
      console.log(`Received private message from ${sender}: ${content}`);

      // Update your state or perform any other actions with the received message
      setAllMessage((prevMessages) => [
        ...prevMessages,
        { sender, content, private: true },
      ]);
    };

    // Set up listener for incoming private messages
    socket.on("privateMessage", handlePrivateMessage);

    return () => {
      // Clean up event listener when the component unmounts
      socket.off("privateMessage", handlePrivateMessage);
    };
  }, []);
  return (
    <div className="messaging">
      <div>
        {messagePartner.length !== 0 ? (
          <>
            <div className="chatter">
              <div className="chatter-header">{messagePartner.name}</div>
              <div className="chatter-type">{messagePartner.type}</div>
            </div>
            <div className="all-the-message" ref={messageContainerRef}>
              <div className="flex-container">
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
            </div>
          </>
        ) : (
          <div className="start-message">
            Choose someone to start messaging!
          </div>
        )}
      </div>
      <div className="message-type">
        <input
          type="text"
          placeholder="Message"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className="search-icon" onClick={handleSendMessage}>
          <img src={Send} className="send" alt="Send" />
        </div>
      </div>
    </div>
  );
};

export default Messaging;
