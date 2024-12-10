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
            <Paises register={register} />
        </Input>

        <Input
        label='Fecha de Inicio'>
                <input
                    {...register('date_start', { required: true })}
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </Input>
            <Input
            label='Fecha de finalización'>
                <input
                    {...register('date_end', { required: true })}
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
