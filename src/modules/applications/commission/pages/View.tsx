"use client";
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import CommissionCRUD from "@/core/services/api/applications/commission";
import { Commission } from "@/core/interfaces/applications/comission/commission";
import { useSession } from '@/core/providers/SessionProvider';
import DetailsSection from '@/components/molecules/DetailsSection/DetailsSection';
import View from '@/components/molecules/applications/View';
import MainButton from '@/components/atoms/buttons/MainButton';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import UserApplicationStatus from '@/core/interfaces/applications/applicationsStatus';
import Modal from '@/components/templates/Modal';

const CommissionViewComponent = ({ id }: { id: string }) => {
  const [commission, setCommission] = useState<Commission>({} as Commission);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<UserApplicationStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const commissionCrud = new CommissionCRUD();
      try {
        const data = await commissionCrud.getById(id);
        setCommission(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (commission) {
      setStatuses(commission.status);
    }
  }, [commission]);


  const deleteData = async () => {
    const commissionCrud = new CommissionCRUD();
    try {
      await commissionCrud.deleteData(id);
      toast.success("Comisión eliminada exitosamente");
    } catch (err) {
      toast.error(`${err || "Hubo un problema al eliminar la comisión"}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className='max-w-2xl border shadow-lg p-10 rounded-md mx-auto mt-3'>
      <View title="Ver Comision" statuses={statuses || []}>
        <DetailsSection data={commission} />
      </View>
      <div className='flex gap-4 mt-5'>
        {
          commission?.status?.[commission.status.length - 1]?.name === 'CREADA' &&
          <MainButton text='Eliminar' bgColor='bg-red-500' onClick={() => setConfirmModal(true)}/>
        }
               {
          commission?.status?.[commission.status.length - 1]?.name === 'CREADA' &&
          <SecondaryButton text='Editar'/>
        }
      </div>
      {confirmModal && (
        <Modal setModal={() => setConfirmModal(false)}>
          <h3 className="text-lg font-bold mb-4">¿Estás seguro de que deseas eliminar esta solicitud?</h3>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => setConfirmModal(false)} />
            <MainButton text='Eliminar' bgColor='bg-red-500' onClick={deleteData}/>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CommissionViewComponent;
