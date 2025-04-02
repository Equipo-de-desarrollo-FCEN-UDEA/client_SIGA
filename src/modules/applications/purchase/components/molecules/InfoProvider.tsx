import TextInput from '@/components/atoms/inputs/TextInput';
import { StepThreeFormData } from '@/core/schemas/application/purchase/SelectProviderForm';
import React from 'react'
import { useFormContext } from 'react-hook-form';

const InfoProvider = () => {
    const {
        register,
        formState: { errors },
        } = useFormContext<{
        stepThree: StepThreeFormData;
    }>();
  return (
    <div className='flex flex-col gap-2'>
        <TextInput
            label="Nombre del proveedor:"
            placeholder="Escribe el nombre del proveedor"
            {...register("stepThree.providerName")}
            error={errors.stepThree?.providerName?.message}
        />
        <TextInput
            label="NIT:"
            placeholder="Escribe la identificación del proveedor"
            {...register("stepThree.providerId")}
            error={errors.stepThree?.providerId?.message}
        />
        <TextInput
            label="Correo del proveedor:"
            placeholder="Escribe el correo del proveedor"
            {...register("stepThree.providerEmail")}
            error={errors.stepThree?.providerEmail?.message}
        />
        <TextInput
            label="Teléfono del proveedor:"
            placeholder="Escribe el teléfono del proveedor"
            {...register("stepThree.providerPhone")}
            error={errors.stepThree?.providerPhone?.message}
        />
    </div>
  )
}

export default InfoProvider