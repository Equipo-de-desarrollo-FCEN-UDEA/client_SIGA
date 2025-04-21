import React from "react";
import { useFormContext } from "react-hook-form";

import TextInput from "@/components/atoms/inputs/TextInput";
import { StepThreeFormData } from "@/core/schemas/commissionCreateFormSchema";
import TextArea from "@/components/atoms/inputs/TextArea";

interface JustificationProps {
  commissionDetails?: {
    reason?: string;
    justification?: string;
  };
}

const Justification: React.FC<JustificationProps> = ({ commissionDetails }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ stepThree: StepThreeFormData }>();

  return (
    <div className="space-y-4">
      <TextInput
        label="Motivo de la Comisión"
        placeholder="Escribe el motivo"
        value={commissionDetails?.reason}
        {...register("stepThree.reason")}
        error={errors.stepThree?.reason?.message}
      />
      <TextArea
        label="Justificación"
        placeholder="Escribe la justificación"
        value={commissionDetails?.justification}
        {...register("stepThree.justification")}
        error={errors.stepThree?.justification?.message}
      />
    </div>
  );
};

export default Justification;
