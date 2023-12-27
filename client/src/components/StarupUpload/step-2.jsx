const Step2s = ({ formData, updateFormData, onNext, onPrev }) => {

    const handleChange=(e)=>{
            const {name, value}=e.target;
            updateFormData(name,value);
    }
	return (
		<>
			<div>
				<h2>Step 2: Founding Team</h2>
				<form>
					<div className="mb-3">
						<label htmlFor="cofounderName" className="form-label">
							Co-Founder Name(If any)
						</label>
						<input
							type="text"
							className="form-control"
							id="cofounderName"
							name="cofounderName"
							value={formData.cofounderName}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="coOccupation" className="form-label">
							Co-founder occupation
						</label>
						<input
							type="text"
							className="form-control"
							id="coOccupation"
							name="coOccupation"
							value={
								formData.coOccupation
							}
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

export default Step2s;