"use client";
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import CommissionCRUD from "@/core/services/api/applications/commission";
import UserApplicationService from '@/core/services/api/applications/user_application';
import Commission from "@/core/interfaces/applications/comission/commission";
import DetailsSection from '@/components/molecules/DetailsSection/DetailsSection';
import View from '@/components/molecules/applications/View';
import Response from '@/modules/applications/components/molecules/Response';
import MainButton from '@/components/atoms/buttons/MainButton';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import Modal from '@/components/templates/Modal';
import UserApplication from '@/core/interfaces/applications/userApplication';
import Reject from '@/modules/applications/components/molecules/Reject';
import { useRouter } from 'next/navigation';
import { useSession } from '@/core/providers/SessionProvider';
import { UUID } from 'crypto';


const CommissionViewComponent = ({ id }: { id: string }) => {
  const router = useRouter();
  const [commission, setCommission] = useState<Commission>({} as Commission);

  const [modal, setModal] = useState<boolean>(false);
  const [userApplication, setUserApplication] = useState<UserApplication | null>(null);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [responseModal, setResponseModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();
  const exceedsThirtyDays = (() => {
    if (!commission?.date_start || !commission?.date_end) return false;

    const start = new Date(commission.date_start);
    const end = new Date(commission.date_end);

    // Normalizamos la hora para evitar errores por zonas horarias o desfases
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays > 30;
  })();

  const statusName = userApplication?.user_application_status[0]?.status.name;
  const academicUnitId = userApplication?.user_application_academic_units[0]?.academic_unit.id;
  const isRepresentative = user?.scopes.includes(`representante:${academicUnitId}`);
  const isAuxiliar = user?.scopes.includes(`auxiliar:${academicUnitId}`);

  //modals
  const [rejectModal, setRejectModal] = useState<boolean>(false);

  useEffect(() => {
    const commissionCrud = new CommissionCRUD();
    const userApplicationService = new UserApplicationService();

    const fetchData = async () => {
      try {
        const data = await commissionCrud.getById(id);
        const userApplicationResponse = await userApplicationService.getById(id);
        setUserApplication(userApplicationResponse);
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

  const createVoting = async () => {
    if (academicUnitId) {
      await new CommissionCRUD().advanceCommissionStatus(id as UUID, { academic_unit_id: academicUnitId }, true);
      window.location.reload();
    }
  }

  const approveApplication = async () => {
    await new CommissionCRUD().advanceCommissionStatus(id as UUID, { academic_unit_id: null }, true);
    window.location.reload();
  }

  const deleteData = async () => {
    const commissionCrud = new CommissionCRUD();
    try {
      await commissionCrud.deleteData(id);
      setConfirmModal(false);
      router.push("/");
      toast.success("Comisión eliminada exitosamente");
    } catch (err) {
      toast.error(`${err || "Hubo un problema al eliminar la comisión"}`);
    }
  };

  const navegate = async () => {
    router.push(`/solicitudes/commission/editar/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  if (userApplication) return (
    <div className="max-h-2/3 border shadow-lg p-10 rounded-md w-full sm:mx-auto sm:w-auto my-3">
      <View title="Ver Comisión" userApplication={userApplication}>
        <DetailsSection data={commission} />
      </View>
      {userApplication?.user_application_status.at(0)?.status.name !== 'REJECTED' &&
        userApplication?.user_application_status.at(0)?.status.name !== 'FINISHED' && (
          <div className='flex gap-4 my-3'>
            {
              statusName === 'CREATED' &&
              exceedsThirtyDays &&
              isRepresentative &&
              <MainButton text="Enviar a votación" onClick={() => setConfirmModal(true)} />
            }
            {
              (statusName === 'CREATED' && !exceedsThirtyDays ||
              statusName === 'IN_INSTITUTE' ||
              statusName === 'IN_DEAN') &&
              isRepresentative &&
              <MainButton text="Aprobar Solicitud" onClick={() => setResponseModal(true)} />
            }

            {userApplication && isRepresentative && (
              <MainButton text="Responder" onClick={() => setModal(true)} />
            )}
            {
              (isRepresentative || isAuxiliar) && (
                <MainButton text="Rechazar Solicitud" onClick={() => { setRejectModal(true) }} bgColor='bg-red-500' />
              )
            }
          </div>
        )}

      {modal && (
        <Response
          user_application_id={commission?.id as string}
          academic_unit_id={academicUnitId as string}
        />
      )}
      {confirmModal && (
        <Modal setModal={() => setConfirmModal(false)}>
          <h3 className="text-lg font-bold mb-4">¿Estás seguro de que deseas enviar esta solicitud?</h3>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => setConfirmModal(false)} />
            <MainButton text="Confirmar" onClick={createVoting} />
          </div>
        </Modal>
      )}
      {responseModal && (
        <Modal setModal={() => setResponseModal(false)}>
          <h3 className="text-lg font-bold mb-4">Responder solicitud</h3>
          <p>¿Estás seguro de que deseas aprobar esta solicitud?</p>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => setResponseModal(false)} />
            <MainButton text="Aprobar" onClick={approveApplication} />
          </div>
        </Modal>
      )}
      {rejectModal && userApplication && (
        <Reject 
        userApplicationId={userApplication?.id} 
        setRejectModal={setRejectModal} />
      )}

    </div>
  );
}

export default CommissionViewComponent;
