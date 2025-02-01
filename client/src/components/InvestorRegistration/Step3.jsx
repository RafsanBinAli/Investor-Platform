import { useNavigate } from "react-router-dom";

const Step3 = ({ formData, updateFormData, onBack }) => {
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		updateFormData(name, value);
	};
	const handleComplete = async (e) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullName: formData.fullName,
					email: formData.email,
					password: formData.password,
					city: formData.city,
					country: formData.country,
					phone: formData.phone,
					Username: formData.Username,
					industry: formData.industry,
					investmentType: formData.investmentType,
					occupation: formData.occupation,
					DoB: formData.DoB,
					NID: formData.NID,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			if (response.ok) {
				alert("Registration successful!");
				navigate("/login");
			}
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};

	return (
		<>
			<div>
				<h2>Step 3: Investment Preferences</h2>
				<form>
					<div className="mb-3">
						<label htmlFor="occupation" className="form-label">
							Occupation
						</label>
						<input
							type="text"
							className="form-control"
							id="occupation"
							name="occupation"
							value={formData.occupation}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="industry" className="form-label">
							Industry
						</label>
						<input
							type="text"
							className="form-control"
							id="industry"
							name="industry"
							value={formData.industry}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="investmentType" className="form-label">
							Investment Type
						</label>
						<input
							type="text"
							className="form-control"
							id="investmentType"
							name="investmentType"
							value={formData.investmentType}
							onChange={handleChange}
						/>
					</div>
					<button type="button" className="btn btn-secondary" onClick={onBack}>
						Back
					</button>
					<button
						type="button"
						className="btn btn-secondary c"
						onClick={handleComplete}
					>
						Complete Registration
					</button>
				</form>
			</div>
		</>
	);
};

export default Step3;
