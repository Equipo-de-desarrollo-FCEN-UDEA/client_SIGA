import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import GeneralInfo from "../components/atoms/GeneralInfo";
import MobilityCRUD from "@/core/services/api/applications/mobility";
import Contact from "../components/atoms/Contact";
import Subjects from "../components/atoms/Subjects";
import { useStepperForm } from "@/core/hooks/useStepperForm";
import {
  combinedSchema,
  StepOneFormData,
  StepTwoFormData,
} from "@/core/schemas/mobilityCreateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormStepper from "@/components/molecules/FormStepper/FormStepper";
import Subject from "@/core/interfaces/applications/mobility/subject";

const FormMobility = () => {
  const methods = useForm<Mobility>({
    resolver: zodResolver(combinedSchema),
  });
  const steps = ["Info. general", "Info. Contacto", "Materias"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
    methods,
    combinedSchema,
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const mobilityCRUD = new MobilityCRUD();

  const onSubmit = async (data: {
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
  }) => {
    const currentDate = new Date();
    const requestBody: Mobility = {
      process: data.stepOne.process,
      type: data.stepOne.type,
      purpose: data.stepOne.purpose,
      destination_country: data.stepOne.destination_country,
      destination_institution: data.stepTwo.destination_institution,
      academic_program: data.stepTwo.academic_program,
      name_contact_person: data.stepTwo.name_contact_person,
      cellphone_contact_person: data.stepTwo.cellphone_contact_person,
      email_contact_person: data.stepTwo.email_contact_person,
      date_start: data.stepOne.date_start,
      date_end: data.stepOne.date_end,
      subjects: subjects,
      total_time: 0,
      date_report: currentDate.toString(),
      status: [],
    };

    await mobilityCRUD.create({ ...requestBody });
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
          {currentStep === 1 && <GeneralInfo />}
          {currentStep === 2 && <Contact />}
          {currentStep === 3 && (
            <Subjects subjects={subjects} setSubjects={setSubjects} />
          )}
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default FormMobility;
