import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Reg1 from "./reg-1";
import Reg2 from "./reg-2";

import "../InvestorRegistration/Registration.css";

const Reg = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		
		city: "",
		
		Username: "",
		fullName: "",
		email: "",
		password: "",
		phone: "",
		NID:"",
        highestDegree:"",
        major:"",
        expertArea:""
	});

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const getProgress = () => {
		return `Step ${step} of 2`;
	};

	const updateFormData = (name, value) => {
    
		setFormData({
      ...formData,
      [name]:value,
    })
	};

	return (
		<>
			
			<div className="writing">
				<div className="startup-header"> abc</div>
				<div className="form-container">
					<h1 className="head">
						<u>Startup Manager Registration </u>
					</h1>

					{step === 1 && <Reg1 formData={formData} updateFormData={updateFormData} onNext={nextStep} />}
					{step === 2 && <Reg2 formData={formData} updateFormData={updateFormData}  onBack={prevStep} />}
					
					<br />
					<ProgressBar now={(step / 2) * 100} label={getProgress()} />
				</div>
			</div>
		</>
	);
};

export default Reg;
