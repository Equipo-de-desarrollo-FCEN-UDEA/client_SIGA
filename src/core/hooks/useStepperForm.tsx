import { useState } from "react";

type UseStepperFormProps = {
  methods: any;
  combinedSchema: any;
};

export const useStepperForm = ({ methods, combinedSchema }: UseStepperFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

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

