"use client";

import TextInput from "@components/atoms/inputs/TextInput";
import SelectInput from "@components/atoms/inputs/SelectInput";
import { useFormContext } from "react-hook-form";
import { StepOneFormData } from "@/core/schemas/registerFormSchema";

const RegisterPersonalInfo = () => {

  const { register, formState: { errors } } = useFormContext<{
    stepOne: StepOneFormData;
  }>();

  const identificationType = [
    "CÉDULA DE CIUDADANÍA",
    "CÉDULA DE EXTRANJERÍA",
    "PASAPORTE",
    "TARJETA DE IDENTIDAD",
  ];
  const identificationValue = [
    "cedula_ciudadania",
    "cedula_extranjeria",
    "pasaporte",
    "tarjeta_de_identidad",
  ];

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        {...register("stepOne.name")}
        label="Nombres:"
        error={errors.stepOne?.name?.message}
      />
      <TextInput
        placeholder=""
        label="Apellidos:"
        {...register("stepOne.last_name")}
        error={errors.stepOne?.last_name?.message}
      />
      <SelectInput
        options={identificationType}
        valueOptions={identificationValue}
        {...register("stepOne.identification_type")}
        label="Tipo de Identificación:"
        error={errors.stepOne?.identification_type?.message}
      />
      <TextInput
        placeholder=""
        {...register("stepOne.identification_number")}
        label="Número de Identificación:"
        error={errors.stepOne?.identification_number?.message}
      />
      <TextInput
        placeholder=""
        {...register("stepOne.phone")}
        label="Teléfono:"
        error={errors.stepOne?.phone?.message}
      />
    </div>
  );
};

export default RegisterPersonalInfo;
