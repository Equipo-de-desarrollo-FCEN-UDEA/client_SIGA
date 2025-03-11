import React from "react";
import FormStepper from "@/components/molecules/FormStepper/FormStepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepperForm } from "@/core/hooks/useStepperForm";
import { useForm, FormProvider } from "react-hook-form";
import { Commission } from "@/core/interfaces/applications/comission/commission";
import { 
  combinedSchema, 
  StepOneFormData, 
  StepTwoFormData, 
  StepThreeFormData, 
  StepFourFormData
} from "@/core/schemas/commissionCreateFormSchema";
import Date from "../components/Date";
import { Documents } from "../components/Documents";
import Place from "../components/Place";
import Justification from "../components/Justification";
import { HeadingPrimary } from "@/components/atoms/title/HeadingPrimary";

const FormCommission = () => {
  const methods = useForm<Commission>({
    resolver: zodResolver(combinedSchema),
  });
  const steps = ["Lugar", "Fechas", "Justificación", "Documentos", "Finalizar"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
      methods,
      combinedSchema,
  });
  
  const onSubmit = async (data: {  
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
    stepFour: StepFourFormData; }) => {
      const requestBody: Commission = {
        country: data.stepOne.country,
        state: data.stepOne.state,
        city: data.stepOne.city,
        date_start: data.stepTwo.date_start,
        date_end: data.stepTwo.date_start,
        reason: data.stepThree.reason,
        justification: data.stepThree.justification,
        status: [],
        documents: data.stepFour.documents
      }
      console.log(requestBody);
  };

  return (
    <div className="max-w-4xl border shadow-lg p-10 rounded-md mx-auto mt-3">
      <HeadingPrimary text="Crear Comisión" />
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
          {currentStep === 4 && <Documents />}
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default FormCommission;