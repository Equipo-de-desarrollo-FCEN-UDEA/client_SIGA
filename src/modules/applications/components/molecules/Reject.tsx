import MainButton from '@/components/atoms/buttons/MainButton';
import TextInput from '@/components/atoms/inputs/TextInput';
import Modal from '@/components/templates/Modal';
import UserApplicationService from '@/core/services/api/applications/user_application';
import { UUID } from 'crypto';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';

interface RejectProps {
    setRejectModal: React.Dispatch<React.SetStateAction<boolean>>;
    userApplicationId: UUID;
}


const Reject = ({userApplicationId, setRejectModal}:RejectProps) => {
    const methods = useForm({
        defaultValues: {
            observation: '',
        }
    });
    const [error, setError] = useState<string | null>(null);
    const userApplicationService = new UserApplicationService();

    
    const rejectApplication = async () => {
        try {
            await userApplicationService.advanceStatus(userApplicationId, methods.getValues('observation'), false);
            setRejectModal(false);
            window.location.reload();
        } catch {
            setError('ha ocurrido un error, intente mas tarde');
        }
    }

    if (error) {
        return (
            <Modal setModal={() => setRejectModal(false)}>
                {error}
            </Modal>
        )
    }

  return (
    <Modal setModal={() => setRejectModal(false)}>
        <h2>Rechazar la solicitud</h2>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(rejectApplication)}>
                <div className="flex flex-col gap-3">
                    <TextInput label="Observación" placeholder='ingrese la observación' {...methods.register('observation')} />
                    <MainButton text="Aceptar"  />
                </div>
            </form>
        </FormProvider>
      
    </Modal>
  )
}

export default Reject
