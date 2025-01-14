"use client";

import FormStepper from "@components/molecules/FormStepper/FormStepper";
import RegisterPersonalInfo from "../molecules/RegisterPersonalInfo";
import RegisterUserInfo from "../molecules/RegisterUserInfo";
import RegisterConfirmation from "../molecules/RegisterConfirmation";
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


type TypeAcademicUnit = { name: string; id: string }[];

const RegisterLayout = () => {

  const router = useRouter();

  const steps = ["Info. Personal", "Info. Usuario", "Confirmación"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const methods = useForm<{
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
  }>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      stepOne: {},
      stepTwo: {},
      stepThree: {},
    },
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

  const nextStep = async () => {
    const schemaKeys: ("stepOne" | "stepTwo" | "stepThree")[] = [
      "stepOne",
      "stepTwo",
      "stepThree",
    ];
    const isValid = await methods.trigger(schemaKeys[currentStep - 1]);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

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
      const result = await createUser(requestBody, queryParams);
      
      alert("Usuario creado con éxito");

      router.push("/auth");
    } catch {
      alert("Error al crear el usuario");
    }
  };

  useEffect(() => {
    const loadAcademicUnits = async () => {
      try {
        const data = await fetchAcademicUnitsSorted();
        setAcademicUnitData(data);
      } catch {
        alert("Error al cargar las unidades académicas");
      }
    };

    loadAcademicUnits();
  }, []);

  return (
    <div className="max-w-3xl border shadow-lg p-10 rounded-md">
      <FormProvider {...methods}>
        <FormStepper
          complete={complete}
          currentStep={currentStep}
          steps={steps}
          onClick={nextStep}
          onSubmit={onSubmit}
          handleSubmit={methods.handleSubmit}
        >
          {currentStep === 1 && <RegisterPersonalInfo />}
          {currentStep === 2 && (
            <RegisterUserInfo
              rolId={rolId}
              setRolId={setRolId}
              facultyObject={academicUnitData}
            />
          )}
          {currentStep === 3 && <RegisterConfirmation />}
        </FormStepper>
      </FormProvider>
    </div>
  );
};

export default RegisterLayout;
