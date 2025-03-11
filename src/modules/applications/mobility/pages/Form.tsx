import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import GeneralInfo from "@/modules/applications/mobility/components/atoms/GeneralInfo";
import MobilityCRUD from "@/core/services/api/applications/mobility";
import Contact from "@/modules/applications/mobility/components/atoms/Contact";
import Subjects from "@/modules/applications/mobility/components/atoms/Subjects";
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
  const router = useRouter();
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
      id: null
    };

    const response = await mobilityCRUD.create({ ...requestBody });
    if (response) {
      router.push(`/solicitudes/movilidad/ver/${response.id}`);
    }
  };

  return (
    <div className="w-2/3 max-h-2/3 border shadow-lg p-10 rounded-md w-full sm:mx-auto sm:w-auto my-3">
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
