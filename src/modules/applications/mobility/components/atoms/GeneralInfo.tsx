import React from 'react'

import { useForm, SubmitHandler } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import ProcessEnum from "@/core/interfaces/applications/mobility/process";
import MobilityType from "@/core/interfaces/applications/mobility/type";
import EnumSelect from '@/components/atoms/inputs/EnumSelect';
import MobilityPurpose from '@/core/interfaces/applications/mobility/purpose';
import Paises from '@modules/applications/mobility/components/molecules/Paises';

const GeneralInfo = () => {
const { register, handleSubmit, reset } = useForm<Mobility>();
  return (
    <div>
        <EnumSelect
            label='Proceso'
            enumObject={ProcessEnum}
            register={register}
            name='process'
            required
        />

        <EnumSelect
            label='Tipo'
            enumObject={MobilityType}
            register={register}
            name='type'
            required
        />

        <EnumSelect
            label='Propósito'
            enumObject={MobilityPurpose}
            register={register}
            name='purpose'
            required
        />
        <div>
            <Paises/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Institución de destino</label>
            <input
                {...register('destination_institution', { required: true })}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    </div>
  )
}

export default GeneralInfo
