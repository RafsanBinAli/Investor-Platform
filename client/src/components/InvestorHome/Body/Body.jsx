import Feed from "../Feed/Feed";
import RightBar from "../RightBar/RightBar";
import { useState } from "react";

const Body = () => {
  const [startupName, setStartupName] = useState("");
  const handleSearch = async (searchInput) => {
    setStartupName(searchInput);
  };
  return (
    <>
      <Feed startupName={startupName} />
      <RightBar onSearch={handleSearch} />
    </>
  );
};

export default Body;
