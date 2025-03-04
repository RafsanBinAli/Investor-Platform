import React, { useState, useEffect } from "react";
import { fetchManagerProfile, updateManagerProfile } from "../../api/manager";

const StartupManagerProfile = () => {
  const managerUsername = localStorage.getItem("username");
  const [userData, setUserData] = useState({
    Username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    NID: "",
    highestDegree: "",
    major: "",
    expertArea: "",
  });

  useEffect(() => {
    const loadManagerProfile = async () => {
      const result = await fetchManagerProfile(managerUsername);
      if (result.success) {
        setUserData(result.data);
      } else {
        console.error("Failed to load profile:", result.error);
        // Optionally show error to user
      }
    };

    loadManagerProfile();
  }, [managerUsername]);

  const handleInputChange = (e, field) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    const result = await updateManagerProfile(managerUsername, userData);
    if (result.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile: " + result.error);
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
                  placeholder="fullName"
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
              <span>Education</span>
              <span className="border px-3 p-1 add-experience">
                <i className="fa fa-plus"></i>&nbsp;Education
              </span>
            </div>
            <br />
            <div className="col-md-8">
              <label className="labels">Highest Degree Obtained</label>
              <input
                type="text"
                className="form-control"
                placeholder="experience"
                value={userData.highestDegree}
                onChange={(e) => handleInputChange(e, "highestDegree")}
              />
            </div>
            <br />
            <div className="col-md-8">
              <label className="labels">Major in Study</label>
              <input
                type="text"
                className="form-control"
                placeholder="additional details"
                value={userData.major}
                onChange={(e) => handleInputChange(e, "major")}
              />
            </div>
            <div className="col-md-8">
              <label className="labels">Expert Area</label>
              <input
                type="text"
                className="form-control"
                placeholder="additional details"
                value={userData.expertArea}
                onChange={(e) => handleInputChange(e, "expertArea")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupManagerProfile;
