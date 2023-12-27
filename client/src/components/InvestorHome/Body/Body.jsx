import Feed from "../Feed/Feed";
import RightBar from "../RightBar/RightBar";
import { useEffect, useContext, useState } from "react";
import UserContext from "../../../contexts/userContext";

const Body = () => {
	const { isLoggedIn } = useContext(UserContext);
  const [filterData,setFilterData]=useState([]);
  const [startupLength, setStartupLength]=useState("");
  const [startupName,setStartupName]=useState("");
	const handleSearch=async(searchInput)=>{
     setStartupName(searchInput);
    
  }
	return (
		<>
			<Feed startupName={ startupName} />
			<RightBar onSearch={handleSearch}/>
		</>
	);
};

export default Body;
