import { useState, useEffect } from "react";
import UserContext from "./userContext";
import io from "socket.io-client";

const UserContextProvider = ({ children }) => {
  const [tinNumber, setTinNumber] = useState("");
  const [socketInstance, setSocketInstance] = useState(null);
  const [chatManagerName, setChatManagerName] = useState("");

  useEffect(() => {
    // Create and configure the Socket.IO instance
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

    // Set the socket instance in the state
    setSocketInstance(socket);

    // Cleanup on component unmount
    return () => {
      // Disconnect the Socket.IO connection when the component unmounts
      socket.disconnect();
    };
  }, []);
  return (
    <UserContext.Provider
      value={{
        startupCode: tinNumber,
        setStartupCode: setTinNumber,

        socket: socketInstance,
        chatManagerName,
        setChatManagerName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
