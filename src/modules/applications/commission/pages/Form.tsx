import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
import View from "../components/View";
import CommissionCRUD from "@/core/services/api/applications/commission";

const FormCommission = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<Commission>({
    resolver: zodResolver(combinedSchema),
  });

  const steps = ["Lugar", "Fechas", "Justificación", "Documentos", "Finalizar"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
    methods,
    combinedSchema,
  });

  const commissionCrud = new CommissionCRUD();

  const onSubmit = async (data: {
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
    stepFour: StepFourFormData;
  }) => {
    setIsSubmitting(true);
    const requestBody: Commission = {
      country: data.stepOne.country,
      state: data.stepOne.state,
      city: data.stepOne.city,
      date_start: data.stepTwo.date_start,
      date_end: data.stepTwo.date_start,
      reason: data.stepThree.reason,
      justification: data.stepThree.justification,
      documents: data.stepFour.documents,
    };

    try {
      const response = await commissionCrud.create({ ...requestBody });

      if (response.error)
        throw new Error(response.error.message || "Error al crear la comisión");

      toast.success("Comisión creada exitosamente");

      if (response)
        router.push(`/solicitudes/commission/ver/${response.id}`);
    } catch (error) {
      toast.error(`${error || "Hubo un problema al crear la comisión"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-h-2/3 border shadow-lg p-10 rounded-md w-full sm:mx-auto sm:w-auto my-3">
      <FormProvider {...methods}>
        <FormStepper
          name="Crear Comisión"
          complete={complete}
          currentStep={currentStep}
          steps={steps}
          onNext={nextStep}
          onPrevius={previusStep}
          onSubmit={onSubmit}
          handleSubmit={methods.handleSubmit}
          disabled={isSubmitting}
        >
          <div className="max-w-2x">
            {currentStep === 1 && <Place />}
            {currentStep === 2 && <Date />}
            {currentStep === 3 && <Justification />}
            {currentStep === 4 && <Documents />}
            {currentStep === 5 && <View />}
          </div>
        </FormStepper>
      </FormProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FormCommission;
