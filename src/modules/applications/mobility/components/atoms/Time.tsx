import React from 'react'

import { useForm } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";

const Time = () => {
    const { register } = useForm<Mobility>();
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
        </div>
    )
}

export default Time
