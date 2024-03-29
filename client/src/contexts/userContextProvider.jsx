import { useState,useEffect } from "react";
import UserContext from "./userContext";
import io from "socket.io-client"

const UserContextProvider = ({ children }) => {
	const [userType, setUserType] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [tinNumber, setTinNumber] = useState("");
	const [managerUsername,setManagerUsername]=useState("")
	const [socketInstance, setSocketInstance] = useState(null);
	const [chatManagerName,setChatManagerName]=useState("")

	useEffect(() => {
		// Create and configure the Socket.IO instance
		const socket = io("http://localhost:5000");
		
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
				userType,
				setUserType,
				isLoggedIn,
				setIsLoggedIn,
				username,
				setUser: setUsername,
				 startupCode:tinNumber,
				 setStartupCode:setTinNumber,
				managerUsername,
				setManagerUsername,
				socket: socketInstance,
				chatManagerName,
				setChatManagerName
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
