"use client";

import FormStepper from "@components/molecules/FormStepper/FormStepper";
import RegisterPersonalInfo from "../molecules/RegisterPersonalInfo";
import RegisterUserInfo from "../molecules/RegisterUserInfo";
import RegisterConfirmation from "../molecules/RegisterConfirmation";

import { useState } from "react";

const RegisterLayout = () => {
  const steps = ["Info. Personal", "Info. Usuario", "Confirmación"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const nextStep = () => {
    currentStep === steps.length
      ? setComplete(true)
      : setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="max-w-3xl border shadow-lg p-10 rounded-md">
      <FormStepper
        complete={complete}
        currentStep={currentStep}
        steps={steps}
        onClick={nextStep}
      >
        {currentStep === 1 && <RegisterPersonalInfo />}
        {currentStep === 2 && <RegisterUserInfo />}
        {currentStep === 3 && <RegisterConfirmation />}
      </FormStepper>
    </div>
  );
};

export default RegisterLayout;
