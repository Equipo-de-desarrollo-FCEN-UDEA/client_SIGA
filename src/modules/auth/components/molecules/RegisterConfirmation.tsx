"use client"

import TextInput from "@/components/atoms/inputs/TextInput";
import { useFormContext } from "react-hook-form";

const RegisterConfirmation = () => {

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        type="password"
        label="Crear Contraseña:"
        {...register("stepThree.password")}
        error={(errors.stepThree as any)?.password?.message}
      />
      <TextInput
        placeholder=""
        type="password"
        label="Confirmar Contraseña:"
        {...register("stepThree.confirmPassword")}
        error={(errors.stepThree as any)?.confirmPassword?.message}
      />
    </div>
  )
}

export default RegisterConfirmation
