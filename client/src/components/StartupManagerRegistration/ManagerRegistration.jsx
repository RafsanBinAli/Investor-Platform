import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerManager } from "../../api/manager";
import "../InvestorRegistration/Registration.css";

const ManagerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    fullName: "",
    email: "",
    password: "",
    NID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleComplete = async () => {
    const result = await registerManager(formData);
    
    if (result.success) {
      alert("Registration successful!");
      navigate("/startup/login");
    } else {
      alert(`Registration failed: ${result.error}`);
    }
  };

  return (
    <div className="writing">
      <div className="form-container">
        <h1 className="head">
          <u>Startup Manager Registration</u>
        </h1>
        <h3 style={{ marginBottom: "40px", fontSize: "24px" }}>
          Step 1: Basic Information
        </h3>
        <form>
          <div className="mb-3">
            <label htmlFor="Username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="NID" className="form-label">
              NID
            </label>
            <input
              type="text"
              className="form-control"
              id="NID"
              name="NID"
              value={formData.NID}
              onChange={handleChange}
            />
          </div>
        </form>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleComplete}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default ManagerRegistration;