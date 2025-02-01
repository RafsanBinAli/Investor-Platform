import { useState, useEffect, useContext } from "react";
import "./Profile.css";
import UserContext from "../../contexts/userContext";
import { fetchUserData } from "../../api/manager"; 

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
      const data = await fetchUserData(managerUsername);
      if (data) {
        setUserData(data);
      }
    };

    if (managerUsername) {
      sendData();
    }
  }, [managerUsername]);

  return (
    <>
      <div className="profile-holder">
        <div className="Profile">
          <div className="pic"></div>
          <div className="info">
            <p className="p"> Username: {managerUsername}</p>
            <p className="p"> Full Name: {userData.fullName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
