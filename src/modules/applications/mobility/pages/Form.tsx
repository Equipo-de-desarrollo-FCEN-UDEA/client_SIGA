import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import GeneralInfo from "../components/atoms/GeneralInfo";
import MobilityCRUD from "@/core/services/api/applications/mobility";
import Time from "../components/atoms/Time";
import Contact from "../components/atoms/Contact";
import Subjects from "../components/atoms/Subjects";
import { useStepperForm } from "@/core/hooks/useStepperForm";
import {
  StepOneFormData,
  StepTwoFormData,
  combinedSchema,
} from "@/core/schemas/mobilityCreateFormSchema";
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
  const steps = ["Info. Personal", "Info. Usuario", "Confirmación"];

  const mobilityCRUD = new MobilityCRUD();

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const onSubmit: SubmitHandler<Mobility> = async (data) => {
    // console.log(data);
    await mobilityCRUD.create({ ...data, status: [] });
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
          {currentStep === 1 && (
            <GeneralInfo register={methods.register} onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <Contact
              register={methods.register}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          {currentStep === 3 && (
            <Subjects
              register={methods.register}
              setValue={methods.setValue}
              onBack={handleBack}
              onSubmit={onSubmit}
            />
          )}
        </FormStepper>
      </FormProvider>
    </div>
    // <form
    //   onSubmit={methods.handleSubmit(onSubmit)}
    //   className="space-y-4 bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto"
    // >
    //   {step === 1 && (
    //     <GeneralInfo register={methods.register} onNext={handleNext} />
    //   )}
    //   {step === 2 && (
    //     <Contact
    //       register={methods.register}
    //       onBack={handleBack}
    //       onNext={handleNext}
    //     />
    //   )}
    //   {step === 3 && (
    //     <Subjects
    //       register={methods.register}
    //       setValue={methods.setValue}
    //       onBack={handleBack}
    //       onSubmit={onSubmit}
    //     />
    //   )}
    // </form>
  );
};

export default FormMobility;
