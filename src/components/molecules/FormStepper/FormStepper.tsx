"use client";

import React, { ReactNode } from "react";
import { TiTick } from "react-icons/ti";
import MainButton from "@components/atoms/buttons/MainButton";
import "./FormStepper.css";
import { UseFormHandleSubmit, FieldValues } from "react-hook-form";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

type FormStepperProps = {
  children: ReactNode;
  steps: string[];
  currentStep: number;
  complete: boolean;
  onNext: () => void;
  onPrevius: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
};

const FormStepper: React.FC<FormStepperProps> = ({
  children,
  steps,
  currentStep,
  complete,
  onNext,
  onPrevius,
  onSubmit,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
    <div>
      <div className="w-full flex justify-center">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
              } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <TiTick size={24} className="text-white" />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      {children}
    </div>


    <div className="flex justify-between mt-5 gap-3">
      {currentStep > 1 && (
        <SecondaryButton text="Atrás" buttonType="button" onClick={onPrevius} />
      )}
      {currentStep < steps.length && (
        <MainButton
          onClick={onNext}
          buttonType={"button"}
          text={"Siguiente"}
        />
      )}
      {currentStep === steps.length && (
        <MainButton buttonType="submit" text="Terminar" />
      )}
    </div>
  </form>
);

export default FormStepper;
