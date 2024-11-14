"use client";

import TextInput from "@components/atoms/inputs/TextInput";
import SelectInput from "@components/atoms/inputs/SelectInput";
import createUser from "@/core/interfaces/createUser";
import { UseFormRegister, FieldValues } from "react-hook-form";

const RegisterPersonalInfo = ({
  formValues,
  handleChange,
  register,
}: {
  formValues: createUser;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  register: UseFormRegister<FieldValues>;
}) => {
  const identificationType = [
    "CÉDULA DE CIUDADANÍA",
    "CÉDULA DE EXTRANJERÍA",
    "PASAPORTE",
    "TARJETA DE IDENTIDAD",
    "DOC. IDENT. DE EXTRANJEROS",
  ];
  const identificationValue = [
    "CEDULA_CIUDADANIA",
    "CEDULA_EXTRANJERIA",
    "PASAPORTE",
    "TARJETA_IDENTIDAD",
    "DOCUMENTO_IDENTIDAD_EXTRANJEROS",
  ];

  return (
    <div className="grid gap-4 my-7">
      <TextInput placeholder="" label="Apellidos:" {...register("last_name")} />
      <TextInput placeholder="" {...register("name")} label="Nombres:" />
      <SelectInput
        options={identificationType}
        valueOptions={identificationValue}
        {...register("identification_type")}
        label="Tipo de Identificación:"
      />
      <TextInput
        placeholder=""
        {...register("identification_number")}
        label="Número de Identificación:"
      />
      <TextInput
        placeholder=""
        {...register("phone")}
        label="Teléfono:"
      />
    </div>
  );
};

export default RegisterPersonalInfo;
