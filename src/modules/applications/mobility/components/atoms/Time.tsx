import React from 'react'

import { useForm } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";

import { UseFormRegister, SubmitHandler } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    onBack: () => void;
    onSubmit: SubmitHandler<Mobility>;
}

const Time: React.FC<Props> = ({register, onBack, onSubmit}) => {
    return (
        <div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                <input
                    {...register('date_start', { required: true })}
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de fin</label>
                <input
                    {...register('date_end', { required: true })}
                    type="date"
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

            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="text-red-600 px-4 py-2 rounded-md shadow-sm hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Atrás
                </button>
                <button
                    type="submit"
                    className="bg-green-btn-gradient text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Enviar
                </button>
            </div>
            
        </div>
    )
}

export default Time
