import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import GeneralInfo from "../components/atoms/GeneralInfo";
import MobilityCRUD from "@/core/services/api/applications/mobility";
import Contact from "../components/atoms/Contact";
import Subjects from "../components/atoms/Subjects";
import { useStepperForm } from "@/core/hooks/useStepperForm";
import { combinedSchema } from "@/core/schemas/mobilityCreateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormStepper from "@/components/molecules/FormStepper/FormStepper";

const FormMobility = () => {
  const methods = useForm<Mobility>({
    resolver: zodResolver(combinedSchema),
  });
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
    methods,
    combinedSchema,
  });
  const steps = ["Info. general", "Info. Contacto", "Materias"];

  const mobilityCRUD = new MobilityCRUD();

  // const onSubmit: SubmitHandler<Mobility> = async (data) => {
  //   console.log("data", data);
  //   await mobilityCRUD.create({ ...data, status: [] });
  // };

  const onSubmit = (data: any) => {
    console.log("errors", methods);
    console.log("data", data);
  };

  return (
    <div className="max-w-xl border shadow-lg p-10 rounded-md mx-auto mt-3">
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
          {currentStep === 1 && <GeneralInfo />}
          {currentStep === 2 && <Contact />}
          {currentStep === 3 && (
            <Subjects
              register={methods.register}
              setValue={methods.setValue}
              // onSubmit={onSubmit}
            />
          )}
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default FormMobility;
