// Import necessary React and Bootstrap components
import React, { useContext, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Step1s from "./step-1";
import Step2s from "./step-2";
import Step3s from "./step-3"
import Step4s from "./step-4"
import "./StartupForm.css";
import UserContext from "../../contexts/userContext";

const StartupForm = () => {
	
	const {managerUsername,setManagerUsername}= useContext(UserContext)
	
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		startupName: "",
		industry: "",
		foundingDate: "",
		location: "",
		tinNumber:"",
		cofounderName:"",
		coOccupation:"",
		NID:"",
		initialFund:"",
		totalRevenue:"",
		fundingNeeded:"",
		goals:"",
		motivation:"",
		briefExplain:"",
		startupManagerUsername:managerUsername
	});

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	// // Handle form input changes
	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData({ ...formData, [name]: value });
	// };

	// // Handle form submission
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	// Add logic to send form data to backend or perform other actions
	// 	console.log("Form submitted:", formData);
	// };

	const updateFormData = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<>
			<div className="form">
				{step === 1 && (
					<Step1s
						formData={formData}
						updateFormData={updateFormData}
						onNext={nextStep}
					/>
				)}
        {step ===2 && <Step2s formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep}/>}
        {step ===3 && <Step3s formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep}/>}
        {step ===4 && <Step4s formData={formData} updateFormData={updateFormData} onPrev={prevStep} />}
			</div>
		</>
	);
};

export default StartupForm;
