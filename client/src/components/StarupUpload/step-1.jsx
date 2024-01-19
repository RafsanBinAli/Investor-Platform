const Step1s = ({ formData, updateFormData, onNext }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		updateFormData(name, value);
	};
	return (
		<div>
			<h3 style={{ marginBottom: "40px", fontSize: "24px" }}>
				Step 1: Basic Information
			</h3>
			<form>
				<div className="mb-3">
					<label htmlFor="startupName" className="form-label">
						Startup Name
					</label>
					<input
						type="text"
						className="form-control"
						id="startup-name"
						name="startupName"
						value={formData.startupName.toUpperCase()}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="industry" className="form-label">
						Industry
					</label>
					<select
						className="form-select"
						id="industry"
						name="industry"
						value={formData.industry}
						onChange={handleChange}
						required
					>
						<option value="Tech">Tech</option>
						<option value="Food">Food</option>
						<option value="Sports">Sports</option>
						<option value="Others">Others</option>
					</select>
				</div>
				<div className="mb-3">
					<label htmlFor="foundingDate" className="form-label">
						Founding Date
					</label>
					<input
						type="text"
						className="form-control"
						id="founding-date"
						name="foundingDate"
						value={formData.foundingDate}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="location" className="form-label">
						Location
					</label>
					<input
						type="text"
						className="form-control"
						id="location"
						name="location"
						value={formData.location}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="tinNumber" className="form-label">
						TIN Number
					</label>
					<input
						type="text"
						className="form-control"
						id="tinNumber"
						name="tinNumber"
						value={formData.tinNumber}
						onChange={handleChange}
					/>
				</div>

				<button type="button" className="btn btn-secondary" onClick={onNext}>
					Next
				</button>
			</form>
		</div>
	);
};
export default Step1s;
