import React from 'react'

import Input from '@/components/atoms/inputs/Input';
import InputText from '@/components/atoms/inputs/InputText';

import { UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    onBack: () => void;
    onNext: () => void;
}

const Contact: React.FC<Props> = ({ register, onBack, onNext }) => {
    return (
        <div className='space-y-4'>
            <Input
                label="Institución de destino"
            >
                <InputText
                    {...register('destination_institution', { required: true })}
                    placeholder='ingrese la institución de destino'
                    name='destination_institution'
                />
            </Input>

            <Input
                label="Nombre"
            >
                <InputText
                    {...register('name_contact_person', { required: true })}
                    placeholder='ingrese el nombre del contacto en la institución de destino'
                    name='name_contact_person'
                />
            </Input>
            <Input
                label="Celular"
            >
                <InputText
                    {...register('cellphone_contact_person', { required: true })}
                    placeholder='ingrese el celular del contacto en la institución de destino'
                    name='cellphone_contact_person'
                />
            </Input>
            <Input
                label='Correo'
            >
                <InputText
                    {...register('email_contact_person', { required: true })}
                    placeholder='ingrese el correo del contacto en la institución de destino'
                    name='email_contact_person'
                />
            </Input>
            <div className="flex justify-between mt-4">
                <button
                    onClick={onBack}
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Atrás
                </button>

                <button
                    onClick={onNext}
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}

export default Contact
