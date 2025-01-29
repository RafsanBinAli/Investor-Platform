import { useNavigate } from "react-router-dom";

const Reg2 = ({ formData, updateFormData, onBack }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };
  const handleComplete = async (e) => {
    try {
      const response = await fetch("http://localhost:4000/startup/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          city: formData.city,
          phone: formData.phone,
          Username: formData.Username,
          NID: formData.NID,
          highestDegree: formData.highestDegree,
          major: formData.major,
          expertArea: formData.expertArea,

          // Add other properties from the form data
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.ok) {
        alert("Registration successful!");
        navigate("/startup/login");
      }

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <>
      <div>
        <h2>Step 2: Personal Details</h2>
        <form>
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

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="HighestDegree" className="form-label">
              Highest Degree Attained
            </label>
            <input
              type="text"
              className="form-control"
              id="highestDegree"
              name="highestDegree"
              value={formData.highestDegree}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="major" className="form-label">
              Major in Study:
            </label>
            <input
              type="text"
              className="form-control"
              id="major"
              name="major"
              value={formData.major}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="expertArea" className="form-label">
              Area Expertise
            </label>
            <input
              type="text"
              className="form-control"
              id="expertArea"
              name="expertArea"
              value={formData.expertArea}
              onChange={handleChange}
            />
          </div>

          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleComplete}
          >
            Complete
          </button>
        </form>
      </div>
    </>
  );
};

export default Reg2;
