import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import GeneralInfo from "@/modules/applications/mobility/components/atoms/GeneralInfo";
import MobilityCRUD from "@/core/services/api/applications/mobility";
import Contact from "@/modules/applications/mobility/components/atoms/Contact";
import Documents from "@/modules/applications/mobility/components/molecules/Documents";
import Subjects from "@/modules/applications/mobility/components/atoms/Subjects";
import { useStepperForm } from "@/core/hooks/useStepperForm";
import {
  combinedSchema,
  StepOneFormData,
  StepTwoFormData,
  StepThreeFormData,
  MobilityFormSchema,
} from "@/core/schemas/mobilityCreateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormStepper from "@/components/molecules/FormStepper/FormStepper";
import Subject from "@/core/interfaces/applications/mobility/subject";

const FormMobility = () => {
  const router = useRouter();
  const methods = useForm<MobilityFormSchema>({
    resolver: zodResolver(combinedSchema),
  });
  
  const steps = ["Info. general", "Info. Contacto", "Documentos", "Materias"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
    methods,
    combinedSchema,
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const mobilityCRUD = new MobilityCRUD();

  const onSubmit = async (data: {
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
  }) => {
    const currentDate = new Date();
    const formData = new FormData();
    formData.append('process', data.stepOne.process);
    formData.append('type', data.stepOne.type);
    formData.append('purpose', data.stepOne.purpose);
    formData.append('destination_country', data.stepOne.destination_country);
    formData.append('destination_institution', data.stepTwo.destination_institution);
    formData.append('academic_program', data.stepTwo.academic_program);
    formData.append('name_contact_person', data.stepTwo.name_contact_person);
    formData.append('cellphone_contact_person', data.stepTwo.cellphone_contact_person);
    formData.append('email_contact_person', data.stepTwo.email_contact_person);
    formData.append('date_start', data.stepOne.date_start);
    formData.append('date_end', data.stepOne.date_end);
    formData.append('subjects', (JSON.stringify(subjects)).replace(/[[]]/g, "") );
    formData.append('total_time', '0');
    formData.append('date_report', currentDate.toString());
    //files
    formData.append('admission_letter', data.stepThree.admissionLetter[0])
    formData.append('enrollment_certificate', data.stepThree.enrollmentCertificate[0])
    if (data.stepThree.insurance?.[0]) {
      formData.append('insurance', data.stepThree.insurance[0] ?? '');
    }
    if (data.stepThree.passport?.[0]) {
      formData.append('passport', data.stepThree.passport?.[0] ?? '')
    }

    console.log(formData.get('subjects'));

    const response = await mobilityCRUD.create(formData);
    if (response) {
      router.push(`/solicitudes/movilidad/ver/${response.id}`);
    }
  };

  return (
    <div className="max-h-2/3 border shadow-lg p-10 rounded-md w-full sm:mx-auto sm:w-auto my-3">
      <FormProvider {...methods}>
        <FormStepper
          name="Movilidad"
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
          {currentStep === 3 && <Documents methods={methods}/>}
          {currentStep === 4 && (
            <Subjects subjects={subjects} setSubjects={setSubjects} />
          )}
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default FormMobility;
