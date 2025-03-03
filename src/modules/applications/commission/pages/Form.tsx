import React from "react";
import FormStepper from "@/components/molecules/FormStepper/FormStepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepperForm } from "@/core/hooks/useStepperForm";
import { useForm, FormProvider } from "react-hook-form";
import { Commission } from "@/core/interfaces/applications/comission/commission";
import { combinedSchema, StepTwoFormData } from "@/core/schemas/commissionCreateFormSchema";
import { StepOneFormData } from "@/core/schemas/commissionCreateFormSchema";
import { StepThreeFormData } from "@/core/schemas/registerFormSchema";
import Date from "../components/Date";
import Place from "../components/Place";
import Justification from "../components/Justification";

const FormCommission = () => {
  const methods = useForm<Commission>({
    resolver: zodResolver(combinedSchema),
  });
  const steps = ["Lugar", "Fechas", "Justificación", "Documentos"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
      methods,
      combinedSchema,
  });
  
  const onSubmit = async (data: {  
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData}) => {

  };

  return (
    <div className="max-w-4xl border shadow-lg p-10 rounded-md mx-auto mt-3">
      <FormProvider {...methods}>
        <FormStepper
          complete={complete}
          currentStep={currentStep}
          steps={steps}
          onNext={nextStep}
          onPrevius={previusStep}
          onSubmit={onSubmit}
          handleSubmit={methods.handleSubmit}
        >
          {currentStep === 1 && <Place />}
          {currentStep === 2 && <Date />}
          {currentStep === 3 && <Justification />}
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default FormCommission;