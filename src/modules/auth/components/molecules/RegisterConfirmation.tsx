"use client"

import TextInput from "@/components/atoms/inputs/TextInput";
import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

const RegisterConfirmation = ({register}: {register:UseFormRegister<FieldValues>}) => {
  const [prueba, setPrueba] = useState("");

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        type="password"
        label="Crear Contraseña:"
        {...register("password")}
      />
      <TextInput
        placeholder=""
        type="password"
        label="Confirmar Contraseña:"
        {...register("confirmPassword")}
      />
    </div>
  )
}

export default RegisterConfirmation
