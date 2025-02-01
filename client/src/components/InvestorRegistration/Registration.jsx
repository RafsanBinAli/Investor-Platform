import { useState } from "react";
import "../InvestorRegistration/Registration.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/investor";

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    NID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleComplete = async (e) => {
    try {
      setIsSubmitting(true);

      const response = await registerUser(formData);
      if (response.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed! " + response.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="writing">
        <div className="form-container">
          <h1 className="head">
            <u>Investor Registration </u>
          </h1>
          <div>
            <form>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usermame"
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
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
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

              <button
                type="button"
                className={isSubmitting ? "btn-submitting" : "btn-regular"}
                onClick={handleComplete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
