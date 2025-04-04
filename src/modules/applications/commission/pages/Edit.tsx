import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
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
import { HeadingPrimary } from "@/components/atoms/title/HeadingPrimary";
import View from "../components/View";
import CommissionCRUD from "@/core/services/api/applications/commission";


const EditCommissionComponent = ({ id }: { id: string }) => {
  const router = useRouter();
  const [commission, setCommission] = useState<Commission>({} as Commission);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const methods = useForm<Commission>({
    resolver: zodResolver(combinedSchema),
  });
  const steps = ["Lugar", "Fechas", "Justificación", "Documentos", "Finalizar"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
    methods,
    combinedSchema,
  });

  const commissionCrud = new CommissionCRUD();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await commissionCrud.getById(id);
        setCommission(data);
        console.log(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const onSubmit = async (data: {
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
    stepFour: StepFourFormData;
  }) => {
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
    try {
      const response = await commissionCrud.updateData(id, { ...requestBody });

      if (response.error) {
        throw new Error(response.error.message || "Error al editar la comisión");
      }

      toast.success("Comisión editada exitosamente");

      if (response) {
        router.push(`/solicitudes/commission/ver/${response.id}`);
      }

    } catch (error) {
      toast.error(`${error || "Hubo un problema al editar la comisión"}`);
    }
  };

  return (
    <div className="h-fit border shadow-lg p-5 rounded-md mx-auto mt-3">
      <HeadingPrimary text="Editar Comisión" />
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
          {currentStep === 1 && <Place commissionPlace={{ country: commission.country, state: commission.state, city: commission.city }}  />}
          {currentStep === 2 && <Date commissionDate={{date_start: commission.date_start, date_end: commission.date_end}}/>}
          {currentStep === 3 && <Justification commissionDetails={{ reason: commission.reason, justification: commission.justification }} />}
          {currentStep === 4 && <Documents />}
          {currentStep === 5 && <View />}
        </FormStepper>
      </FormProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditCommissionComponent;