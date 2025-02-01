import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Step1s from "./step-1";
import Step2s from "./step-2";
import Step3s from "./step-3";
import Step4s from "./step-4";
import "./StartupForm.css";

const StartupForm = () => {
  const managerUsername = localStorage.getItem("username");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    foundingDate: "",
    location: "",
    tinNumber: "",
    cofounderName: "",
    coOccupation: "",
    initialFund: "",
    totalRevenue: "",
    fundingNeeded: "",
    goals: "",
    motivation: "",
    briefExplain: "",
    startupManagerUsername: managerUsername,
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

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
        {step === 2 && (
          <Step2s
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 3 && (
          <Step3s
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 4 && (
          <Step4s
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
          />
        )}
      </div>
    </>
  );
};

export default StartupForm;
