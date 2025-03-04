import { useState } from "react";
import { Path, UseFormReturn, FieldValues } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";

type UseStepperFormProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  combinedSchema: ZodObject<ZodRawShape>;
};

const useStepperForm = <T extends FieldValues,>({ methods, combinedSchema }: UseStepperFormProps<T>) => {
  const [currentStep, setCurrentStep] = useState(1);
  const complete = false;

  const nextStep = async () => {
    const typeCombinedSchema = Object.keys(combinedSchema.shape);
    const isValid = await methods.trigger(typeCombinedSchema[currentStep - 1] as Path<T>);


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

