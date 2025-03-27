
import MainButton from '@/components/atoms/buttons/MainButton';
import Modal from '@/components/templates/Modal';
import UserApplication from '@/core/interfaces/applications/userApplication';
import UserApplicationService from '@/core/services/api/applications/user_application';
import React, { useEffect, useState } from 'react'

interface NextStatusProps {
    setNextStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
    userApplication: UserApplication;
}

const NextStatus = ({ userApplication, setNextStatusModal }: NextStatusProps) => {
    const statusCount = userApplication.user_application_status.length;
    const applicationId = userApplication.application.id;
    const userApplicationService = new UserApplicationService();
    const [error, setError] = useState<string | null>(null);

    const [nextStep, setNextStep] = useState<string>('');

    const fetchData = async () => {
        try {
            const data = await userApplicationService.getNextStep(applicationId, statusCount);
            setNextStep(data);
        } catch {
            setError('ha ocurrido un error, intente mas tarde')
        }
    }

    useEffect(() => {
        fetchData();
    }, [setNextStatusModal])

    const advancePurchaseStatus = async () => {
        try {
            await userApplicationService.advanceStatus(userApplication.id);
            setNextStatusModal(false);
            window.location.reload();
        } catch {
            setError('ha ocurrido un error, intente mas tarde');
        }
    }

    if (error) {
        return (
            <Modal setModal={() => setNextStatusModal(false)}>
                {error}
            </Modal>
        )
    }

    return (
        <Modal setModal={() => setNextStatusModal(false)}>
            Actualizar el estado de la solicitud a: {nextStep}
            <div className="flex gap-3">
                <MainButton onClick={advancePurchaseStatus} text="Aceptar" />
                <MainButton onClick={() => setNextStatusModal(false)} text="Cancelar" bgColor='bg-red-500' />
            </div>
        </Modal>
    )
}

export default NextStatus