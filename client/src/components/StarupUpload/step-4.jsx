import { useContext } from "react";
import UserContext from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Step4s = ({ formData, updateFormData, onPrev }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };
  const { managerUsername } = useContext(UserContext);
  const handleComplete = async (e) => {
    if (
      !formData.startupName ||
      !formData.industry ||
      !formData.foundingDate ||
      !formData.location ||
      !formData.initialFund ||
      !formData.totalRevenue ||
      !formData.fundingNeeded ||
      !formData.goals ||
      !formData.motivation ||
      !formData.briefExplain
    ) {
      alert("Please fill in all required fields");
      return;
    }
    const response = await fetch("http://localhost:4000/startup/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startupName: formData.startupName,
        industry: formData.industry,
        foundingDate: formData.foundingDate,
        location: formData.location,
        tinNumber: formData.tinNumber,
        cofounderName: formData.cofounderName,
        coOccupation: formData.coOccupation,
        NID: formData.NID,
        initialFund: formData.initialFund,
        totalRevenue: formData.totalRevenue,
        fundingNeeded: formData.fundingNeeded,
        goals: formData.goals,
        motivation: formData.motivation,
        briefExplain: formData.briefExplain,
        startupManagerUsername: managerUsername,
      }),
    });
    if (response.ok) {
      alert("Successfully uploaded!");
      navigate("/startup/home");
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
            <label htmlFor="Motivation" className="form-label">
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
              Brief Explannation
            </label>
            <textarea
              className="form-control"
              id="briefExplain"
              name="briefExplain"
              value={formData.briefExplain}
              onChange={handleChange}
              rows="4"
              column="6"
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
