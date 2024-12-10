"use client"

import TextInput from "@/components/atoms/inputs/TextInput";
import { StepThreeFormData } from "@/core/schemas/registerFormSchema";
import { useFormContext } from "react-hook-form";

const RegisterConfirmation = () => {

  const {
    register,
    formState: { errors },
  } = useFormContext<{
    stepThree: StepThreeFormData;
  }>();

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        type="password"
        label="Crear Contraseña:"
        {...register("stepThree.password")}
        error={errors.stepThree?.password?.message}
      />
      <TextInput
        placeholder=""
        type="password"
        label="Confirmar Contraseña:"
        {...register("stepThree.confirmPassword")}
        error={errors.stepThree?.confirmPassword?.message}
      />
    </div>
  )
}

export default RegisterConfirmation
