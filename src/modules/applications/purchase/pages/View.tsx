import { Purchase } from '@/core/interfaces/applications/purchases/Purchase';
import PurchaseService from '@/core/services/api/applications/purchases';
import UserApplicationService from '@/core/services/api/applications/user_application';
import ViewElement from '@/modules/applications/components/atoms/ViewElement';
import UserApplicationStatus from '@/core/interfaces/applications/applicationsStatus';

import React, { useEffect, useState } from 'react'
import UserApplication from '@/core/interfaces/userApplication';
import SelectAuxiliary from '@/modules/applications/components/molecules/SelectAuxiliary';
import CompleteInfo from '@/modules/applications/purchase/components/molecules/CompleteInfo';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';

const View = ({ id }: { id: string }) => {
    const [userApplication, setUserApplication] = useState<UserApplication | null>(null);
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const [statuses, setStatuses] = useState<UserApplicationStatus[]>([]);

    //modals
    const [assistantModal, setAssistantModal] = useState<boolean>(false);
    const [completeInfoModal, setCompleteInfoModal] = useState<boolean>(false);

    useEffect(() => {
        const purchaseService = new PurchaseService();
        const userApplicationService = new UserApplicationService();
        const fetchData = async () => {
            try {
                const data = await purchaseService.getById(id);
                const userApplicationData = await userApplicationService.getById(id);
                setPurchase(data);
                setUserApplication(userApplicationData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id])

    useEffect(() => {
        if (purchase) {
            setStatuses(purchase.status);
        }
    }, [purchase]);

    const getFormat = async () => {
        const purchaseService = new PurchaseService();
        if (purchase?.id) {
            await purchaseService.downloadFormat(purchase.id);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <div className='max-w-4xl border shadow-lg p-10 rounded-md mx-auto mt-3'>
            <h1 className='text-2xl font-bold mb-3'>Información de la Compra</h1>

            <div className='grid justify-items-stretch grid-flow-row md:grid-cols-3 grid-cols-1 gap-4 my-4'>
                <ViewElement
                    label="Tipo"
                    body={purchase?.type ?? ''}
                />
                <ViewElement
                    label="Procedencia"
                    body={purchase?.scope ?? ''}
                />
                <ViewElement
                    label="Valor o presupuesto estimado"
                    body={purchase?.estimated_budget ? purchase.estimated_budget.toString() : null}
                />
                <div className='grid gap-4 col-span-full'>
                    <ViewElement
                        label="Necesidad y conveniencia de la contratación"
                        body={purchase?.need ?? ''}
                    />
                    <ViewElement
                        label="Descripción del objeto del contrato"
                        body={purchase?.description ?? null}
                    />
                </div>
                {statuses.at(-1)?.name == 'Archivos Cargados' && (
                    <SecondaryButton text="Asignar auxiliar" onClick={() => setAssistantModal(true)} />
                )}

                {statuses.at(-1)?.name == 'Auxiliar Asignado' && (
                    <SecondaryButton text="Completar información" onClick={() => setCompleteInfoModal(true)} />
                )}

                {statuses.length > 3 && (
                    <SecondaryButton text="Descargar Formato de vicerrectoria" onClick={() => { getFormat() }} />
                )}

            </div>

            {assistantModal && userApplication && (
                <SelectAuxiliary
                    user_application_id={userApplication?.id ?? ''}
                    academic_unit_id={userApplication?.user_application_academic_units.at(-1)?.academic_unit.id as `${string}-${string}-${string}-${string}-${string}`}
                    setAssistantModal={setAssistantModal} 
                />
            )}

            {completeInfoModal && userApplication && (
                <CompleteInfo user_application_id={userApplication?.id} setCompleteInfoModal={setCompleteInfoModal}/>

            )}

        </div>

    )
}

export default View