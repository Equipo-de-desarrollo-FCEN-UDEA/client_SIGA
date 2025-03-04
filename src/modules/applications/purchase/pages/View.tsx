import { Purchase } from '@/core/interfaces/applications/purchases/Purchase';
import PurchaseService from '@/core/services/api/applications/purchases';
import ViewElement from '@/modules/applications/components/atoms/ViewElement';

import React, { useEffect, useState } from 'react'

const View = ({ id }: { id: string }) => {
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const purchaseService = new PurchaseService();
        const fetchData = async () => {
            try {
                const data = await purchaseService.getById(id);
                setPurchase(data);
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

        </div>
        </div>
        
    )
}

export default View