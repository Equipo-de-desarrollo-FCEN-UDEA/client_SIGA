import { Purchase } from '@/core/interfaces/applications/purchases/Purchase';
import PurchaseService from '@/core/services/api/applications/purchases';
import UserApplicationService from '@/core/services/api/applications/user_application';
import ViewElement from '@/modules/applications/components/atoms/ViewElement';
import React, { useEffect, useState } from 'react'
import UserApplication from '@/core/interfaces/applications/userApplication';
import SelectAuxiliary from '@/modules/applications/components/molecules/SelectAuxiliary';
import CompleteInfo from '@/modules/applications/purchase/components/molecules/CompleteInfo';
import SelectProvider from '@/modules/applications/purchase/components/organisms/SelectProvider';
import Status from '@/modules/applications/components/molecules/Status';
import NextStatus from '@/modules/applications/components/molecules/NextStatus';
import Reject from '@/modules/applications/components/molecules/Reject';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import { UUID } from 'crypto';
import MainButton from '@/components/atoms/buttons/MainButton';
import ViewApplication from '@/components/molecules/applications/View';
import { useSession } from '@/core/providers/SessionProvider';

const View = ({ id }: { id: string }) => {
    const [userApplication, setUserApplication] = useState<UserApplication | null>(null);
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const [currentStatus, setCurrentStatus] = useState<string | null>(null);
    const { user } = useSession();

    //modals
    const [assistantModal, setAssistantModal] = useState<boolean>(false);
    const [completeInfoModal, setCompleteInfoModal] = useState<boolean>(false);
    const [statusModal, setStatusModal] = useState<boolean>(false);
    const [nextStatusModal, setNextStatusModal] = useState<boolean>(false);
    const [selectProviderModal, setSelectProviderModal] = useState<boolean>(false);
    const [rejectModal, setRejectModal] = useState<boolean>(false);

    useEffect(() => {
        const purchaseService = new PurchaseService();
        const userApplicationService = new UserApplicationService();
        const fetchData = async () => {
            try {
                const data = await purchaseService.getById(id);
                const userApplicationData = await userApplicationService.getById(id);
                setPurchase(data);
                setUserApplication(userApplicationData);
                setCurrentStatus(userApplicationData?.user_application_status.at(0)?.status.name);
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

    const getFormat = async () => {
        const purchaseService = new PurchaseService();
        if (purchase?.id) {
            await purchaseService.downloadFormat(purchase.id);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (userApplication) return (
            <div className='max-w-4xl border shadow-lg p-10 rounded-md mx-auto my-2'>
                <ViewApplication title="Información de la Compra" userApplication={userApplication}>
                    <div className='grid justify-items-stretch grid-flow-row md:grid-cols-3 grid-cols-1 gap-4 my-4 border-b-2'>
                        <ViewElement
                            label="Solicitante"
                            body={`${userApplication?.user.name} ${userApplication?.user.last_name}`}
                        />
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
                            body={purchase?.estimated_budget ? `$${purchase.estimated_budget.toString()}` : null}
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
                    </div>
                    {purchase?.materials && (
                        <div className='border-b-2'>
                            <h5 className='font-bold'>Materiales</h5>
                            <table className='table-auto w-full border-collapse border '>
                                <thead>
                                    <tr>
                                        <th className='border-t border-b border-gray-300 px-4 py-2'>Nombre</th>
                                        <th className='border-t border-b border-gray-300 px-4 py-2'>Cantidad</th>
                                        <th className='border-t border-b border-gray-300 px-4 py-2'>Valor unitario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchase?.materials.map((material, index) => (
                                        <tr key={material.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className='border-t border-b border-gray-300 px-4 py-2'>{material.name}</td>
                                            <td className='border-t border-b border-gray-300 px-4 py-2'>{material.quantity}</td>
                                            <td className='border-t border-b border-gray-300 px-4 py-2'>{material.unit_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </ViewApplication>
                <div className='flex flex-col gap-2'>

                    {(currentStatus != 'REJECTED' && currentStatus != 'FINISHED') && (
                        <>
                            {userApplication?.user_application_status.length == 1 &&
                                user?.scopes.includes(`representante:${userApplication?.user_application_academic_units[0]?.academic_unit.id}`) &&
                                (
                                    <SecondaryButton text="Asignar auxiliar" onClick={() => setAssistantModal(true)} />
                                )
                            }

                            {userApplication?.user_application_status.length == 2 &&
                                user?.scopes.includes(`auxiliar:${userApplication?.user_application_academic_units[0]?.academic_unit.id}`) &&
                                (
                                    <SecondaryButton text="Completar información" onClick={() => setCompleteInfoModal(true)} />
                                )
                            }

                            {userApplication?.user_application_status?.length >= 3 &&
                                user?.scopes.includes(`representante:${userApplication?.user_application_academic_units[0]?.academic_unit.id}`) &&
                                user?.scopes.includes(`auxiliar:${userApplication?.user_application_academic_units[0]?.academic_unit.id}`) &&
                                (
                                    <SecondaryButton text="Descargar Formato de vicerrectoria" onClick={() => { getFormat() }} />
                                )
                            }

                            {userApplication?.user_application_status.length && [3, 4, 6, 7].includes(userApplication?.user_application_status.length) &&
                                user?.scopes.includes(`auxiliar:${userApplication?.user_application_academic_units[0]?.academic_unit.id}`) &&
                                (
                                    <SecondaryButton text="Actualizar estado" onClick={() => { setNextStatusModal(true) }} />
                                )
                            }

                            {userApplication?.user_application_status.length == 5 &&
                                user?.id == userApplication?.user.id &&
                                (
                                    <SecondaryButton text="Seleccionar proveedor" onClick={() => setSelectProviderModal(true)} />
                                )
                            }
                            {(user?.scopes.includes(`representante:${userApplication?.user_application_academic_units[0]?.academic_unit.id}`) ||
                                user?.scopes.includes(`auxiliar:${userApplication?.user_application_academic_units[0]?.academic_unit.id}`)) &&
                                (
                                    <MainButton text="Rechazar Solicitud" onClick={() => { setRejectModal(true) }} bgColor='bg-red-500' />
                                )
                            }
                        </>
                    )}
                </div>

                {assistantModal && userApplication && (
                    <SelectAuxiliary
                        user_application_id={userApplication?.id ?? ''}
                        academic_unit_id={userApplication?.user_application_academic_units.at(-1)?.academic_unit.id as UUID}
                        setAssistantModal={setAssistantModal}
                    />
                )}

                {completeInfoModal && userApplication && (
                    <CompleteInfo user_application_id={userApplication?.id} setCompleteInfoModal={setCompleteInfoModal} />

                )}

                {statusModal && userApplication && (
                    <Status status={userApplication?.user_application_status} setStatusModal={setStatusModal} />
                )}

                {nextStatusModal && userApplication && (
                    <NextStatus userApplication={userApplication} setNextStatusModal={setNextStatusModal} />
                )}

                {selectProviderModal && userApplication && (
                    <SelectProvider user_application_id={userApplication?.id} setSelectProviderModal={setSelectProviderModal} />
                )}

                {rejectModal && userApplication && (
                    <Reject userApplicationId={userApplication?.id} setRejectModal={setRejectModal} />
                )}

            </div>
    )
}

export default View