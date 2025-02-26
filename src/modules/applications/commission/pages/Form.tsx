import React from "react";
import FormStepper from "@/components/molecules/FormStepper/FormStepper";
import { combinedSchema } from "@/core/schemas/mobilityCreateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepperForm } from "@/core/hooks/useStepperForm";
import Place from "../components/Place";
import { useForm, FormProvider } from "react-hook-form";

const FormCommission = () => {
  const methods = useForm<any>({
    resolver: zodResolver(combinedSchema),
  });
  const steps = ["Lugar", "Fechas", "Justificación", "Documentos"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
      methods,
      combinedSchema,
  });
  
  const onSubmit = async (data: any) => {
    console.log(data);
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
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default FormCommission;