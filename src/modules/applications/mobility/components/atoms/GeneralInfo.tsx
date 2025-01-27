import React from "react";
import ProcessEnum from "@/core/interfaces/applications/mobility/process";
import MobilityType from "@/core/interfaces/applications/mobility/type";
import EnumSelect from "@/components/atoms/inputs/EnumSelect";
import MobilityPurpose from "@/core/interfaces/applications/mobility/purpose";
import Input from "@/components/atoms/inputs/Input";
import TextInput from "@/components/atoms/inputs/TextInput";
import { StepOneFormData } from "@/core/schemas/mobilityCreateFormSchema";
import { useFormContext } from "react-hook-form";
import { processArray, typeArray, purposeArray } from "../../utils/selectOptions";

import { UseFormRegister } from "react-hook-form";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import { error } from "console";

interface Props {
  register: UseFormRegister<any>;
  onNext: () => void;
}

const GeneralInfo: React.FC<Props> = ({ onNext }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    stepOne: StepOneFormData;
  }>();

  return (
    <div className="space-y-4">
      <SelectInput
        options={processArray}
        valueOptions={processArray}
        label="Proceso:"
        {...register("stepOne.process")}
        error={errors.stepOne?.process?.message}
      />

      <SelectInput
        options={typeArray}
        valueOptions={typeArray}
        label="Tipo:"
        {...register("stepOne.type")}
        error={errors.stepOne?.type?.message}
      />
      
      <SelectInput
        options={purposeArray}
        valueOptions={purposeArray}
        label="Propósito:"
        {...register("stepOne.purpose")}
        error={errors.stepOne?.purpose?.message}
      />

      <TextInput
        label="País de destino"
        placeholder="Escribe el nombre del país"
        {...register("stepOne.destination_country")}
        error={errors.stepOne?.destination_country?.message}
      />

      <Input label="Fecha de Inicio">
        <input
          //   {...register("date_start", { required: true })}
          type="date"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </Input>
      <Input label="Fecha de finalización">
        <input
          //   {...register("date_end", { required: true })}
          type="date"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </Input>
    </div>
  );
};

export default GeneralInfo;
