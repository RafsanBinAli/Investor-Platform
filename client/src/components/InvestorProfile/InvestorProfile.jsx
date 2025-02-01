import React, { useState, useEffect, useContext } from "react";
import "./InvestorProfile.css";
import UserContext from "../../contexts/userContext";
const InvestorProfile = () => {
  const { username } = useContext(UserContext);
  const [userData, setUserData] = useState({
    occupation: "",
    industry: "",
    investmentType: "",
    DoB: "",
    city: "",
    country: "",
    Username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    NID: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/investor-profile?username=${username}`
        );
        const data = await response.json();
        setUserData(data.investor);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleInputChange = (e, field) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/update-investor-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, ...userData }),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Profile updated successfully!");
      } else {
        console.error("Failed to update profile:", response.status);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="user-profile"
            />
            <span className="font-weight-bold">{userData.Username}</span>
            <span className="text-black-50">{userData.email}</span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  value={userData.Username}
                  onChange={(e) => handleInputChange(e, "Username")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.fullName}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "fullName")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.phone}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "phone")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">NID</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.NID}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "NID")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Date of Birth</label>
                <input
                  type="text"
                  className="form-control"
                  value={new Date(userData.DoB).toLocaleDateString()}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "DoB")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.occupation}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "occupation")}
                />
              </div>

              <div className="col-md-6">
                <label className="labels">Country</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.country}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "country")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.city}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "city")}
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>Investment Preference</span>
              <span className="border px-3 p-1 add-experience">
                <i className="fa fa-plus"></i>&nbsp;Investment
              </span>
            </div>
            <br />
            <div className="col-md-12">
              <label className="labels">Prefered Investment Sector</label>
              <input
                type="text"
                className="form-control"
                placeholder="experience"
                value={userData.industry}
                onChange={(e) => handleInputChange(e, "industry")}
              />
            </div>
            <br />
            <div className="col-md-12">
              <label className="labels">Investment Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="additional details"
                value={userData.investmentType}
                onChange={(e) => handleInputChange(e, "investmentType")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
