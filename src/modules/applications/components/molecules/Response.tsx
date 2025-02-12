import SelectInput from '@/components/atoms/inputs/SelectInput';
import Modal from '@/components/templates/Modal';
import React, { useState } from 'react'
import {ResultOptions} from '@/core/interfaces/applications/userApplicationAcademicUnit';
import MainButton from '@/components/atoms/buttons/MainButton';
import UserApplicationAcademicUnitService from '@/core/services/api/applications/user_application_academic_unit';

interface ResponseProps {
    user_application_id: string;
    academic_unit_id: string;
}

const Response = ({user_application_id, academic_unit_id}: ResponseProps) => {
    const [result, setResult] = useState<string>('');
    const [modal, setModal] = useState<boolean>(true);


    const handleSubmit = async () => {
        await new UserApplicationAcademicUnitService().response(
            user_application_id,
            academic_unit_id, 
            result
        );
        window.location.reload();
    }
    return (
        modal && (
            <Modal setModal={() => setModal(false)}>
                <h2 className="text-xl font-bold text-center my-3">Responder solicitud</h2>
                <form className="mb-4 flex flex-col gap-3">
                    <SelectInput
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                        options={Object.values(ResultOptions)}
                        valueOptions={Object.values(ResultOptions)}
                        label="Seleccionar una respuesta"
                        placeholder="Seleccione una opción...."
                    />
                </form>

                <div className="mt-16">
                    <MainButton text="Guardar" onClick={handleSubmit} />
                </div>
            </Modal>
        )
    )
}

export default Response