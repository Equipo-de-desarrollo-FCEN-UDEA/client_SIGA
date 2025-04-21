import React from "react";
import { useFormContext } from "react-hook-form";
import { StepTwoFormData } from "@/core/schemas/commissionCreateFormSchema";
import DateInput from "@/components/atoms/inputs/DateInput";

interface DateComponentProps {
  commissionDate?: {
    date_start?: string;
    date_end?: string;
  };
}

const DateComponent: React.FC<DateComponentProps> = ({ commissionDate }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ stepTwo: StepTwoFormData }>();

  return (
    <div className="space-y-4">
      <DateInput
        label="Fecha de Inicio"
        placeholder="Selecciona una fecha"
        value={commissionDate?.date_start}
        {...register("stepTwo.date_start")}
        error={errors.stepTwo?.date_start?.message}
      />
      <DateInput
        label="Fecha de Finalización"
        placeholder="Selecciona una fecha"
        value={commissionDate?.date_end}
        {...register("stepTwo.date_end")}
        error={errors.stepTwo?.date_end?.message}
      />
    </div>
  );
};

export default DateComponent;
