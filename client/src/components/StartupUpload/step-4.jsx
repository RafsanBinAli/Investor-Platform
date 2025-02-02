import { useNavigate } from "react-router-dom";
import { uploadStartup } from "../../api/startupApi";

const Step4s = ({ formData, updateFormData, onPrev }) => {
  const navigate = useNavigate();
  const managerUsername = localStorage.getItem("username");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleComplete = async () => {
    // Check if all required fields are filled
    const requiredFields = [
      "startupName",
      "industry",
      "foundingDate",
      "location",
      "initialFund",
      "totalRevenue",
      "fundingNeeded",
      "goals",
      "motivation",
      "briefExplain",
    ];
    const missingField = requiredFields.find((field) => !formData[field]);

    if (missingField) {
      alert("Please fill in all required fields");
      return;
    }

    // Call the API function for uploading the startup
    const { success, error } = await uploadStartup(formData, managerUsername);

    if (success) {
      alert("Successfully uploaded!");
      navigate("/startup/home");
    } else {
      alert(error);
    }
  };

  return (
    <>
      <div>
        <h2>Step 4: Goals and Motivation</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="goals" className="form-label">
              Goals
            </label>
            <textarea
              className="form-control"
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="motivation" className="form-label">
              Motivation
            </label>
            <textarea
              className="form-control"
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="briefExplain" className="form-label">
              Brief Explanation
            </label>
            <textarea
              className="form-control"
              id="briefExplain"
              name="briefExplain"
              value={formData.briefExplain}
              onChange={handleChange}
              rows="4"
              columns="6"
            ></textarea>
          </div>

          <button type="button" className="btn btn-secondary" onClick={onPrev}>
            Back
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleComplete}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Step4s;
