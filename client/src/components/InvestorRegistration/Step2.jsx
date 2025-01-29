const Step2 = ({ formData, updateFormData, onNext, onBack }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		updateFormData(name, value);
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
						<label htmlFor="DoB" className="form-label">
							Date of Birth
						</label>
						<input
							type="date"
							className="form-control"
							id="DoB"
							name="DoB"
							value={
								formData.DoB ? formData.DoB.toISOString().split("T")[0] : ""
							}
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
						<label htmlFor="country" className="form-label">
							Country
						</label>
						<input
							type="text"
							className="form-control"
							id="country"
							name="country"
							value={formData.country}
							onChange={handleChange}
						/>
					</div>

					<button type="button" className="btn btn-secondary" onClick={onBack}>
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

export default Step2;
