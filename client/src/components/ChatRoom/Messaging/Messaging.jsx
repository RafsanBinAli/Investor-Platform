import { useRef, useContext, useState, useEffect } from "react";
import "./Messaging.css";
import Send from "./send.png";

import UserContext from "../../../contexts/userContext";

const Messaging = ({ messagePartner }) => {
  const [newMessage, setNewMessage] = useState("");
  const { userType, username, managerUsername, socket, chatManagerName } =
    useContext(UserContext);
  const [allMessage, setAllMessage] = useState([]);
  var senderUsername;
  var receiverUsername = messagePartner.name;

  // Check the userType and set the sender accordingly
  if (userType === "investor") {
    senderUsername = username;
  } else if (userType === "startup") {
    senderUsername = managerUsername;
  }

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
    // Check if messagePartner is defined and has an id
    if (messagePartner && messagePartner.id !== undefined) {
      const id = messagePartner.id;

      try {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/message-retriving?convoID=${id}`
            );

            if (response.ok) {
              const data = await response.json();
              setAllMessage(data);
            } else {
              console.log(
                "Error fetching messages:",
                response.status,
                await response.text()
              );
            }
          } catch (error) {
            console.error("Error during fetch:", error);
          }
        };

        fetchData();
      } catch (error) {
        console.log("Error retrieving messages:", error);
      }
    } else {
      console.log("Invalid message partner or ID");
    }
  }, [messagePartner]);

  useEffect(() => {
    if (messagePartner && messagePartner.id !== undefined) {
      // Authenticate the user
      const sender = userType === "investor" ? username : managerUsername;
      socket.emit("authenticate", sender);

      // Listen for server-relayed messages
      socket.on("serverMessage", ({ sender, content }) => {
        console.log(
          `Received server-relayed message from ${sender}: ${content}`
        );
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
  }, [messagePartner, userType, username, managerUsername]);

  const sendMessage = async () => {
    const receiver = messagePartner.name;
    if (newMessage !== "") {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newMessage,
            senderUsername: senderUsername,
            receiverUsername: receiverUsername,
          }),
        });

        if (!response.ok) {
          console.log("there is problem with sending message");
        } else {
          console.log("this is new message", newMessage);

          setAllMessage((prevMessages) => [
            ...prevMessages,
            { sender, content: newMessage, private: true },
          ]);

          socket.emit("clientMessage", {
            sender: sender,
            receiver: receiver,
            content: newMessage,
          });
          console.log("Message emitted successfully:", {
            sender: sender,
            receiver: receiver,
            content: newMessage,
          });
        }
      } catch (error) {
        console.log("sending problem");
      }
    }

    setNewMessage("");
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
      console.log("State updated:", allMessage);
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
        <div className="search-icon" onClick={sendMessage}>
          <img src={Send} className="send" alt="Send" />
        </div>
      </div>
    </div>
  );
};

export default Messaging;
