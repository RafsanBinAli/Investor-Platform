import { useState, useEffect } from "react";
import "./InvestorProfile.css";
import useUserProfile from "../../hooks/useUserProfile";

const InvestorProfile = () => {
  const username = localStorage.getItem('username');
  const { userData, saveUserProfile } = useUserProfile(username);

  const [updatedUserData, setUpdatedUserData] = useState(userData);

  useEffect(() => {
    if (userData) {
      setUpdatedUserData(userData);
    }
  }, [userData]);

  const handleInputChange = (e, field) => {
    setUpdatedUserData({
      ...updatedUserData,
      [field]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    const result = await saveUserProfile(updatedUserData);
    if (result.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile.");
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
            <span className="font-weight-bold">
              {updatedUserData?.Username}
            </span>
            <span className="text-black-50">{updatedUserData?.email}</span>
          </div>
        </div>

        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  value={updatedUserData?.Username || ""}
                  onChange={(e) => handleInputChange(e, "Username")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData?.fullName || ""}
                  placeholder="surname"
                  onChange={(e) => handleInputChange(e, "fullName")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData?.phone || ""}
                  placeholder="mobile number"
                  onChange={(e) => handleInputChange(e, "phone")}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">NID</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData?.NID || ""}
                  placeholder="National ID"
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
      </div>
    </div>
  );
};

export default InvestorProfile;
