"use client";

import FormStepper from "@components/molecules/FormStepper/FormStepper";
import RegisterPersonalInfo from "../molecules/RegisterPersonalInfo";
import RegisterUserInfo from "../molecules/RegisterUserInfo";
import RegisterConfirmation from "../molecules/RegisterConfirmation";
import { getFilteredAcademicUnits, getFilteredInstitutes } from "@/utils/getFilteredAcademicUnits";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from "@/core/schemas/registerFormSchema";

type TypeAcademicUnit = { name: string; id: string }[];

const RegisterLayout = () => {
  const steps = ["Info. Personal", "Info. Usuario", "Confirmación"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const methods = useForm({
    resolver: zodResolver(
      currentStep === 1
        ? stepOneSchema
        : currentStep === 2
        ? stepTwoSchema
        : stepThreeSchema
    ),
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
  const [academicUnitId, setAcademicUnitId] = useState("");

  const nextStep = () => {
    if (methods.formState.isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Formulario no válido.");
    }
  };

  const onSubmit = (data: any) => {
    alert("Datos enviados");
    console.log("Finalizando registro con datos:", data);
    setComplete(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchAcademicUnitData = async () => {
      try {
        const response = await fetch("http://localhost:8003/api/v1/academic_unit/adb1ea44-189f-47a7-b763-e0aae6e7c07e");
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
      <FormStepper
        complete={complete}
        currentStep={currentStep}
        steps={steps}
        onClick={nextStep}
        onSubmit={onSubmit}
        handleSubmit={methods.handleSubmit}
      >
        <FormProvider {...methods}>
          {currentStep === 1 && (
            <RegisterPersonalInfo
              formValues={formValues}
              handleChange={handleChange}
              register={methods.register}
            />
          )}
          {currentStep === 2 && (
            <RegisterUserInfo
              formValues={formValues}
              handleChange={handleChange}
              rolId={rolId}
              academicUnitId={academicUnitId}
              setRolId={setRolId}
              setAcademicUnitId={setAcademicUnitId}
              facultyObject={academicUnitData}
              register={methods.register}
            />
          )}
          {currentStep === 3 && (
            <RegisterConfirmation register={methods.register} />
          )}
        </FormProvider>
      </FormStepper>
    </div>
  );
};

export default RegisterLayout;
