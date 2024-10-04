"use client";

import React, { ReactNode } from "react";
import { TiTick } from "react-icons/ti";

import MainButton from "@components/atoms/buttons/MainButton";
import "./FormStepper.css";

type FormStepperProps = {
  children: ReactNode;
  steps: string[];
  currentStep: number;
  complete: boolean;
  onClick: () => void;
};

const FormStepper: React.FC<FormStepperProps> = ({
  children,
  steps,
  currentStep,
  complete,
  onClick,
}) => {
  return (
    <>
      <div className="w-full flex">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} className="text-white" /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      <div>{children}</div>

      {!complete && (
        <MainButton
          onClick={onClick}
          text={currentStep === steps.length ? "Terminar" : "Siguiente"}
        />
      )}
    </>
  );
};

export default FormStepper;
