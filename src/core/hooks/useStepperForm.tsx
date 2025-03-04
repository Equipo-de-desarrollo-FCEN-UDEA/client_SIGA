import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";

type UseStepperFormProps = {
  methods: UseFormReturn;
  combinedSchema: ZodObject<ZodRawShape>;
};

const useStepperForm = ({ methods, combinedSchema }: UseStepperFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const complete = false;

  const nextStep = async () => {
    const typeCombinedSchema = Object.keys(combinedSchema.shape);
    const isValid = await methods.trigger(typeCombinedSchema[currentStep - 1]);


    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previusStep = () => {
    setCurrentStep((prev) => prev - 1);
  }

  return {
    currentStep,
    complete,
    nextStep,
    previusStep
  };
};

export { useStepperForm };

