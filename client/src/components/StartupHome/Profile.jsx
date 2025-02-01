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
          <img
            className="rounded-circle"
            width="150px"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="User Profile"
          />

          <div className="info">
            <p className="p">
              <span className="label">Username:</span>{" "}
              <span className="value">{managerUsername}</span>
            </p>
            <p className="p">
              <span className="label">Full Name:</span>{" "}
              <span className="value">{userData.fullName}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
