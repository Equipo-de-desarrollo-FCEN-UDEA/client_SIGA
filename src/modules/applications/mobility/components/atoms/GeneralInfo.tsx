import React from 'react'

import { useForm, SubmitHandler } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import ProcessEnum from "@/core/interfaces/applications/mobility/process";
import MobilityType from "@/core/interfaces/applications/mobility/type";
import EnumSelect from '@/components/atoms/inputs/EnumSelect';
import MobilityPurpose from '@/core/interfaces/applications/mobility/purpose';
import Paises from '@modules/applications/mobility/components/molecules/Paises';
import Input from '@/components/atoms/inputs/Input';
import InputText from '@/components/atoms/inputs/InputText';

import { UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>; 
    onNext: () => void; 
}

const GeneralInfo: React.FC<Props> = ({register, onNext}) => {
  return (
    <div className='space-y-4'>
        <Input
        label = "Proceso"
        >
            <EnumSelect
                register={register}
                enumObject={ProcessEnum}
                name='process'
            />
        </Input>
        
        <Input
        label = "Tipo"
        >
            <EnumSelect
                register={register}
                enumObject={MobilityType}
                name='type'
            />
        </Input>

        <Input
        label = "Proposito"
        >
            <EnumSelect
                register={register}
                enumObject={MobilityPurpose}
                name='purpose'
            />
        </Input> 
        <Input
        label="País de destino"
        >
            <InputText
            {...register('destination_country', { required: true })}
            placeholder='ingrese el pais de destino'
            name='destination_country'
            />
        </Input>

        <Input
        label="Institución de destino"
        >
            <InputText
            {...register('destination_institution', { required: true })}
            placeholder='ingrese la institución de destino'
            name='destination_institution'
            />
        </Input>
        <div>
            <button
                onClick={onNext}
                className="w-full bg-green-btn-gradient text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Siguiente
            </button>
        </div>
    </div>
  )
}

export default GeneralInfo
