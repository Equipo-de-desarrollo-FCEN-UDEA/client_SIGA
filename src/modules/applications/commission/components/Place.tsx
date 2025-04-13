import React from "react";
import TextInput from "@/components/atoms/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import { StepOneFormData } from "@/core/schemas/commissionCreateFormSchema";

interface PlaceProps {
  commissionPlace?: {
    country?: string;
    state?: string;
    city?: string;
  };
}

const Place: React.FC<PlaceProps> = ({ commissionPlace }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ stepOne: StepOneFormData }>();

  return (
    <div className="space-y-4">
      <TextInput
        label="País"
        placeholder="Escribe el nombre del país"
        {...register("stepOne.country")}
        error={errors.stepOne?.country?.message}
      />
      <TextInput
        label="Estado / Departamento / Región"
        placeholder="Escribe el nombre del estado"
        {...register("stepOne.state")}
        error={errors.stepOne?.state?.message}
      />
      <TextInput
        label="Ciudad"
        placeholder="Escribe el nombre de la ciudad"
        {...register("stepOne.city")}
        error={errors.stepOne?.city?.message}
      />
    </div>
  );
};

export default Place;
