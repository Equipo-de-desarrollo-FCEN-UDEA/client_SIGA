import React, { useEffect, useState } from 'react'

import Modal from '@/components/templates/Modal';
import { UUID } from 'crypto';
import UserRolAcademicUnitService from '@/core/services/api/user/userRolAcademicUnit';
import SelectInput from '@/components/atoms/inputs/SelectInput';
import UserRolAcademicUnit from '@/core/interfaces/user/userRolAcademicUnit';
import { PurchaseRequest } from '@/core/interfaces/applications/purchases/Purchase';
import MainButton from '@/components/atoms/buttons/MainButton';
import PurchaseService from '@/core/services/api/applications/purchases';

interface SelectAuxiliaryProps {
    user_application_id: UUID;
    academic_unit_id: UUID;
    setAssistantModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectAuxiliary = ({ user_application_id, academic_unit_id, setAssistantModal }: SelectAuxiliaryProps) => {
    const [auxiliaries, setAuxiliaries] = useState([]);
    const [selectedAuxiliary, setSelectedAuxiliary] = useState<UUID | null>(null);

    useEffect(() => {
        const userRolAcademicUnitService = new UserRolAcademicUnitService();
        const fetchData = async () => {
        try {
            const data = await userRolAcademicUnitService.det_axiliaries_by_academic_unit(academic_unit_id);
            setAuxiliaries(data);
        }
        catch (error) {
            console.error('Error fetching auxiliaries:', error);
        }
    }
        fetchData();
    }, [academic_unit_id]);

    const handleSubmit = async () => {
        const data: PurchaseRequest = {
            user_to_assign_id: selectedAuxiliary,
            observation: null,
            purchase_complete: null,
            selected_provider: null,
            materials: null
        }
        await new PurchaseService().advancePurchaseStatus(
            data,
            user_application_id,
            true
        );
        window.location.reload();
    }

    return (
        <Modal setModal={() => setAssistantModal(false)}>
            <div>
                <h2 className="text-xl font-bold text-center my-3">Asignar Auxiliar</h2>
                <form >
                        <SelectInput
                            value={selectedAuxiliary as UUID}
                            onChange={(e) => setSelectedAuxiliary(e.target.value as UUID)}
                            options={auxiliaries.map((auxiliary: UserRolAcademicUnit) => auxiliary.user.name + ' ' + auxiliary.user.last_name)}
                            valueOptions={auxiliaries.map((auxiliary: UserRolAcademicUnit) => auxiliary.user.id)}
                            label='Seleccionar Auxiliar'
                            placeholder='Seleccione una opción...'
                        />
                </form>
            </div>
            <div className="mt-16">
                <MainButton text="Guardar" onClick={handleSubmit} />
            </div>
        </Modal>
    )
}

export default SelectAuxiliary