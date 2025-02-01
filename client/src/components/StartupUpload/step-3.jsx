const Step3s = ({ formData, updateFormData, onNext, onPrev }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };
  return (
    <>
      <div>
        <h2>Step 3: Funding Details</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="initialFund" className="form-label">
              Initial Fund
            </label>
            <input
              type="text"
              className="form-control"
              id="initialFund"
              name="initialFund"
              value={formData.initialFund}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="totalRevenue" className="form-label">
              Total Revenue
            </label>
            <input
              type="text"
              className="form-control"
              id="totalRevenue"
              name="totalRevenue"
              value={formData.totalRevenue}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fundingNeeded" className="form-label">
              Funding Needed
            </label>
            <input
              type="text"
              className="form-control"
              id="fundingNeeded"
              name="fundingNeeded"
              value={formData.fundingNeeded}
              onChange={handleChange}
            />
          </div>

          <button type="button" className="btn btn-secondary" onClick={onPrev}>
            Back
          </button>
          <button type="button" className="btn btn-secondary" onClick={onNext}>
            Next
          </button>
        </form>
      </div>
    </>
  );
};
export default Step3s;
