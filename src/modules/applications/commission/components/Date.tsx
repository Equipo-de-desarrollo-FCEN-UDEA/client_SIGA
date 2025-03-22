import React from "react";
import { useFormContext } from "react-hook-form";
import { StepTwoFormData } from "@/core/schemas/commissionCreateFormSchema";
import DateInput from "@/components/atoms/inputs/DateInput";

const Place = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    stepTwo: StepTwoFormData;
  }>();

  return (
    <div className="space-y-4">
      <DateInput
        label="Fecha de Inicio"
        {...register("stepTwo.date_start")}
        error={errors.stepTwo?.date_start?.message}
      />
      <DateInput
        label="Fecha de finalización"
        {...register("stepTwo.date_end")}
        error={errors.stepTwo?.date_end?.message}
      />
    </div>
  );
};

export default Place;
