import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import "../InvestorRegistration/Registration.css";

const Registration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    occupation: "",
    industry: "",
    investmentType: "",
    DoB: "",
    city: "",
    country: "",
    Username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    NID: "",
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getProgress = () => {
    return `Step ${step} of 3`;
  };

  const updateFormData = (name, value) => {
    const formattedValue = name === "DoB" ? new Date(value) : value;
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  return (
    <>
      <div className="writing">
        <div className="form-container">
          <h1 className="head">
            <u>Investor Registration </u>
          </h1>

          {step === 1 && (
            <Step1
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              updateFormData={updateFormData}
              onBack={prevStep}
            />
          )}
          <br />
          <ProgressBar now={(step / 3) * 100} label={getProgress()} />
        </div>
      </div>
    </>
  );
};

export default Registration;
