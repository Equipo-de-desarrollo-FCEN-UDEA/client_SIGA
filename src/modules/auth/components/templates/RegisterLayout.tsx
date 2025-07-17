"use client";

import FormStepper from "@components/molecules/FormStepper/FormStepper";
import RegisterPersonalInfo from "@/modules/auth/components/molecules/RegisterPersonalInfo";
import RegisterUserInfo from "@/modules/auth/components/molecules/RegisterUserInfo";
import RegisterConfirmation from "@/modules/auth/components/molecules/RegisterConfirmation";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  combinedSchema,
  StepOneFormData,
  StepTwoFormData,
  StepThreeFormData,
} from "@/core/schemas/registerFormSchema";
import { fetchAcademicUnitsSorted } from "@/core/services/api/academicUnitSorted";
import { createUser } from "@/core/services/api/createUserService";
import { useRouter } from "next/navigation";
import { useStepperForm } from "@/core/hooks/useStepperForm";

type TypeAcademicUnit = { name: string; id: string }[];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const RegisterLayout = () => {
  const router = useRouter();

  const methods = useForm<{
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
  }>({ resolver: zodResolver(combinedSchema) });

  const steps = ["Info. Personal", "Info. Usuario", "Confirmación"];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
    methods,
    combinedSchema,
  });

  const [academicUnitData, setAcademicUnitData] = useState<{
    undergraduate: TypeAcademicUnit;
    postgraduate: TypeAcademicUnit;
    institute: TypeAcademicUnit;
  }>({
    undergraduate: [],
    postgraduate: [],
    institute: [],
  });

  const [rolId, setRolId] = useState("");

  const onSubmit = async (data: {
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
  }) => {
    const requestBody = {
      name: data.stepOne.name,
      last_name: data.stepOne.last_name,
      email: data.stepTwo.email,
      identification_type: data.stepOne.identification_type,
      identification_number: data.stepOne.identification_number,
      phone: data.stepOne.phone,
      is_active: false,
      password: data.stepThree.password,
    };

    const queryParams = new URLSearchParams({
      rol_id: rolId,
      academic_unit_id: data.stepTwo.academic_unit,
    });

    try {
      await createUser(requestBody, queryParams);

      alert("Usuario creado con éxito");

      router.push("/auth");
    } catch {
      alert("Error al crear el usuario");
    }
  };

  const [facultySelection, setFacultySelection] = useState<"FACULTAD DE CIENCIAS EXACTAS" | "FACULTAD DE CIENCIAS SOCIALES Y HUMANAS">("FACULTAD DE CIENCIAS EXACTAS");

  useEffect(() => {
    const loadAcademicUnits = async () => {


      if (!facultySelection) return; // No hay facultad seleccionada aún

      try {
        const data = await fetchAcademicUnitsSorted(facultySelection);
        setAcademicUnitData(data);
      } catch {
        alert("Error al cargar las unidades académicas");
      }
    };

    loadAcademicUnits();
  }, [facultySelection]);


  return (
    <div className="max-w-3xl border shadow-lg p-10 rounded-md">
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
          {currentStep === 1 && <RegisterPersonalInfo />}
          {currentStep === 2 && (
            <RegisterUserInfo
              rolId={rolId}
              setRolId={setRolId}
              facultyObject={academicUnitData}
              setFacultySelection={setFacultySelection}
              facultySelection={facultySelection}
            />
          )}
          {currentStep === 3 && <RegisterConfirmation />}
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default RegisterLayout;
