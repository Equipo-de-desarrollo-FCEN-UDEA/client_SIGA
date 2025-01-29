import React from "react";
import TextInput from "@/components/atoms/inputs/TextInput";
import { StepOneFormData } from "@/core/schemas/mobilityCreateFormSchema";
import { useFormContext } from "react-hook-form";
import {
  processArray,
  typeArray,
  purposeArray,
} from "../../utils/selectOptions";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import DateInput from "@/components/atoms/inputs/DateInput";
import ProcessEnum from '@/core/interfaces/applications/mobility/process';
import TypeEnum from '@/core/interfaces/applications/mobility/type';
import PurposeEnum from '@/core/interfaces/applications/mobility/purpose';

const GeneralInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    stepOne: StepOneFormData;
  }>();

  return (
    <div className="space-y-4">
      <SelectInput
        options={Object.values(ProcessEnum)}
        valueOptions={Object.values(ProcessEnum)}
        label="Proceso:"
        {...register("stepOne.process")}
        error={errors.stepOne?.process?.message}
      />
      <SelectInput
        options={Object.values(TypeEnum)}
        valueOptions={Object.values(TypeEnum)}
        label="Tipo:"
        {...register("stepOne.type")}
        error={errors.stepOne?.type?.message}
      />
      <SelectInput
        options={Object.values(PurposeEnum)}
        valueOptions={Object.values(PurposeEnum)}
        label="Propósito:"
        {...register("stepOne.purpose")}
        error={errors.stepOne?.purpose?.message}
      />
      <TextInput
        label="País de destino:"
        placeholder="Escribe el nombre del país"
        {...register("stepOne.destination_country")}
        error={errors.stepOne?.destination_country?.message}
      />
      <DateInput
        label="Fecha de Inicio:"
        {...register("stepOne.date_start")}
        error={errors.stepOne?.date_start?.message}
      />
      <DateInput
        label="Fecha de finalización:"
        {...register("stepOne.date_end")}
        error={errors.stepOne?.date_end?.message}
      />
    </div>
  );
};

export default GeneralInfo;
