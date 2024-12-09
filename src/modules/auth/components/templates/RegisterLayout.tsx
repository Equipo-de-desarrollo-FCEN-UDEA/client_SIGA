"use client";

import FormStepper from "@components/molecules/FormStepper/FormStepper";
import RegisterPersonalInfo from "../molecules/RegisterPersonalInfo";
import RegisterUserInfo from "../molecules/RegisterUserInfo";
import RegisterConfirmation from "../molecules/RegisterConfirmation";
import {
  getFilteredAcademicUnits,
  getFilteredInstitutes,
} from "@/utils/getFilteredAcademicUnits";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  combinedSchema,
  StepOneFormData,
  StepTwoFormData,
  StepThreeFormData,
} from "@/core/schemas/registerFormSchema";

type TypeAcademicUnit = { name: string; id: string }[];

interface UserResponse {
  created_at: string;
  email: string;
  id: string;
  identification_number: string;
  identification_type: string;
  is_active: boolean;
  last_name: string;
  name: string;
  phone: string;
  updated_at: string;
}

const RegisterLayout = () => {
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

  const [formValues, setFormValues] = useState({
    name: "",
    last_name: "",
    email: "",
    identification_type: "",
    identification_number: "",
    phone: "",
    is_active: true,
    password: "",
  });

  const [rolId, setRolId] = useState("");

  const nextStep = async () => {
    // Define un mapeo de los esquemas al paso actual
    const schemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];

    // Valida solo el esquema correspondiente al paso actual
    const schemaKeys: ("stepOne" | "stepTwo" | "stepThree")[] = [
      "stepOne",
      "stepTwo",
      "stepThree",
    ];
    const isValid = await methods.trigger(schemaKeys[currentStep - 1]);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log(methods.formState.errors);
      console.log("Formulario no válido.");
    }
  };

  const onSubmit = async (data: {
    stepOne: StepOneFormData;
    stepTwo: StepTwoFormData;
    stepThree: StepThreeFormData;
  }) => {
    // Construye el cuerpo de la petición
    const requestBody = {
      name: data.stepOne.name,
      last_name: data.stepOne.last_name,
      email: data.stepTwo.email,
      identification_type: data.stepOne.identification_type,
      identification_number: data.stepOne.identification_number,
      phone: data.stepOne.phone,
      is_active: true,
      password: data.stepThree.password,
    };
  
    const queryParams = new URLSearchParams({
      rol_id: rolId,
      acadeic_unit_id: data.stepTwo.academic_unit,
    });
  
    try {
      const response = await fetch(
        `http://localhost:8003/api/v1/user?${queryParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      alert("Usuario creado con éxito");
    } catch (error) {
      alert(
        "Hubo un error al crear el usuario. Revisa la consola para más detalles."
      );
    }
  };
  

  useEffect(() => {
    const fetchAcademicUnitData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8003/api/v1/academic_unit/adb1ea44-189f-47a7-b763-e0aae6e7c07e"
        );
        const data = await response.json();
        const undergraduate = getFilteredAcademicUnits(data, "PREGRADO");
        const postgraduate = getFilteredAcademicUnits(data, "POSGRADO");
        const institute = getFilteredInstitutes(data);
        setAcademicUnitData({
          undergraduate,
          postgraduate,
          institute,
        });
      } catch (error) {
        console.error("Error fetching academic unit data", error);
      }
    };

    fetchAcademicUnitData();
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
