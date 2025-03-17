import React from "react";
import { useFormContext } from "react-hook-form";

import TextInput from "@/components/atoms/inputs/TextInput";
import { StepThreeFormData } from "@/core/schemas/commissionCreateFormSchema";
import TextArea from "@/components/atoms/inputs/TextArea";

const Place = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    stepThree: StepThreeFormData;
  }>();

  return (
    <div className="space-y-4">
      <TextInput
        label="Motivo de la Comisión"
        placeholder=""
        {...register("stepThree.reason")}
        error={errors.stepThree?.reason?.message}
      />
      <TextArea
        label="Justificación"
        placeholder=""
        {...register("stepThree.justification")}
        error={errors.stepThree?.justification?.message}
      />
    </div>
  );
};

export default Place;
