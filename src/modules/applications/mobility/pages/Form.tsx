import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import GeneralInfo from '../components/atoms/GeneralInfo';
import Time from '../components/atoms/Time';
import EnumSelect from '@/components/atoms/inputs/EnumSelect';
import ProcessEnum from '@/core/interfaces/applications/mobility/process';
import MobilityType from '@/core/interfaces/applications/mobility/type';
import MobilityPurpose from '@/core/interfaces/applications/mobility/purpose';
import Paises from '../components/molecules/Paises';
import create from '@/core/services/api/applications/mobility';
const FormMobility = () => {

    const { register, handleSubmit, reset } = useForm<Mobility>();
    const onSubmit: SubmitHandler<Mobility> = async (data) => {
        console.log("PRUEBA")
        create(data);
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto">
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
                    <Paises register={register} />
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
            <div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                    <input
                        {...register('date_start', { required: true })}
                        type="datetime-local"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de fin</label>
                    <input
                        {...register('date_end', { required: true })}
                        type="datetime-local"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tiempo total</label>
                    <input
                        {...register('total_time', { required: true, valueAsNumber: true })}
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de reporte</label>
                    <input
                        {...register('date_report', { required: true })}
                        type="datetime-local"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-green-btn-gradient text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Enviar
            </button>
        </form>
    )
}

export default FormMobility
