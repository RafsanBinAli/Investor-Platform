import { useState, useEffect, useContext } from "react";

import "./Profile.css";
import UserContext from "../../contexts/userContext";

const Profile = () => {
  const { managerUsername } = useContext(UserContext);
  const [userData, setUserData] = useState({
    Username: "",
    city: "",
    fullName: "",
    shawon: "",
  });

  useEffect(() => {
    const sendData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/startup/home/${managerUsername}`
      );
      if (!response.ok) {
        console.log("error", response.status);
      }

      const data = await response.json();
      console.log(data);
      setUserData(data);
    };

    sendData();

    console.log(userData);
  }, [managerUsername]);
  return (
    <>
      <div className="profile-holder">
        <div className="Profile">
          <div className="pic"></div>
          <div className="info">
            <p className="p"> Username:{managerUsername}</p>
            <p className="p"> Full Name: {userData.fullName}</p>
            <p className="p"> City: {userData.city}</p>
            <p className="p"> IsShawon: {userData.shawon}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
