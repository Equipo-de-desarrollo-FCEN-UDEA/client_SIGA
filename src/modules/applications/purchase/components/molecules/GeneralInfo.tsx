import { StepOneFormData } from '@/core/schemas/PurchaseCreateFormSchema';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import SelectInput from "@/components/atoms/inputs/SelectInput";
import { PurchaseScope, PurchaseType, AcademicsUnit } from '@/core/interfaces/applications/purchases/Purchase';
import TextInput from '@/components/atoms/inputs/TextInput';

const GeneralInfo = () => {
    const {
        register,
        formState: { errors },
        } = useFormContext<{
        stepOne: StepOneFormData;
    }>();
  return (
    <div>
        <SelectInput
            options={Object.keys(AcademicsUnit)}
            valueOptions={Object.keys(AcademicsUnit)}
            label="Unidad Academica:"
            {...register("stepOne.academicUnit")}
            error={errors.stepOne?.academicUnit?.message}
        />
        <SelectInput
            options={Object.values(PurchaseType)}
            valueOptions={Object.values(PurchaseType)}
            label="Tipo:"
            {...register("stepOne.type")}
            error={errors.stepOne?.type?.message}
        />
        <SelectInput
            options={Object.values(PurchaseScope)}
            valueOptions={Object.values(PurchaseScope)}
            label="Alcance:"
            {...register("stepOne.scope")}
            error={errors.stepOne?.scope?.message}
        />
        <TextInput
            label="Necesidad y conveniencia de la contratación:"
            placeholder="Escribe la necesidad"
            {...register("stepOne.need")}
            error={errors.stepOne?.need?.message}
        />
        <TextInput
            label="Descripción del objeto del contrato:"
            placeholder="Escribe la descripción"
            {...register("stepOne.description")}
            error={errors.stepOne?.description?.message}
        />
        <TextInput
            label="Valor o presupuesto estimado:"
            placeholder="Escribe el presupuesto estimado"
            type='number'
            {...register("stepOne.estimated_budget")}
            error={errors.stepOne?.estimated_budget?.message}
        />
    </div>
  )
}

export default GeneralInfo