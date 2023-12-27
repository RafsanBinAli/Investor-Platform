import { useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
	const [userType, setUserType] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [tinNumber, setTinNumber] = useState("");
	const [managerUsername,setManagerUsername]=useState("")

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
				setManagerUsername
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
