import { StepOneFormData } from '@/core/schemas/PurchaseCreateFormSchema';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import ViewElement from '@/modules/applications/components/atoms/ViewElement';

const GeneralInfo = () => {
    const {
        watch,
    } = useFormContext<{
        stepOne: StepOneFormData;
    }>();

    const data = watch("stepOne");

    return (
        <div className='grid justify-items-stretch grid-flow-row md:grid-cols-3 grid-cols-1 gap-4 my-4'>
            <ViewElement
                label="Unidad Academica"
                body={data.academicUnit}
            />
            <ViewElement
                label="Tipo"
                body={data.type}
            />
            <ViewElement
                label="Procedencia"
                body={data.scope}
            />
            <div className='grid gap-4 col-span-full'>
                <ViewElement
                    label="Necesidad y conveniencia de la contratación"
                    body={data.need}
                />
                <ViewElement
                    label="Descripción del objeto del contrato"
                    body={data.description}
                />
                <ViewElement
                    label="Valor o presupuesto estimado"
                    body={data.estimated_budget.toString()}
                />
            </div>

        </div>
    )
}

export default GeneralInfo