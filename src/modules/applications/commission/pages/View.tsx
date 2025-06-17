"use client";
import React, { useState, useEffect } from 'react';
import CommissionCRUD from "@/core/services/api/applications/commission";
import UserApplicationService from '@/core/services/api/applications/user_application';
import Commission from "@/core/interfaces/applications/comission/commission";
import DetailsSection from '@/components/molecules/DetailsSection/DetailsSection';
import View from '@/components/molecules/applications/View';
import MainButton from '@/components/atoms/buttons/MainButton';
import UserApplication from '@/core/interfaces/applications/userApplication';
import ApplicationModals from '../../components/molecules/ApplicationModals';
import { useSession } from '@/core/providers/SessionProvider';
import { UUID } from 'crypto';


const CommissionViewComponent = ({ id }: { id: string }) => {
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

  // Verifica si la comisión ha acabado para subir cumplido
  const endDate = commission?.date_end ? new Date(commission.date_end) : null;
  const now = new Date();
  if (endDate) {
    endDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
  }
  const uploadCompliment = endDate ? now >= endDate : false;

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

  const advanceStatus = async (academicUnitId: string | null) => {
    await new CommissionCRUD().advanceCommissionStatus(
      id as UUID,
      { academic_unit_id: academicUnitId as UUID | null },
      true
    );
    window.location.reload();
  };

  const createVoting = async () => {
    if (academicUnitId) {
      await advanceStatus(academicUnitId);
    }
  };

  const approveApplication = async () => {
    await advanceStatus(null);
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
                statusName === 'IN_DEAN' ||
                statusName === 'UPLOAD_PROOF') &&
              isRepresentative &&
              <MainButton text="Aprobar Solicitud" onClick={() => setResponseModal(true)} />
            }

            { (uploadCompliment && statusName === 'APPROVED') && (
              <MainButton text="Habilitar Cumplido" onClick={() => setResponseModal(true)} />
            )}

            {/* {userApplication && isRepresentative && (
              <MainButton text="Responder" onClick={() => setModal(true)} />
            )} */}
            {
              (isRepresentative || isAuxiliar) &&
              (statusName !== 'UPLOAD_PROOF' && statusName !== 'APPROVED') &&
              (
                <MainButton text="Rechazar Solicitud" onClick={() => { setRejectModal(true) }} bgColor='bg-red-500' />
              )
            }
          </div>
        )}

      <ApplicationModals
        modal={modal}
        confirmModal={confirmModal}
        responseModal={responseModal}
        rejectModal={rejectModal}
        userApplication={userApplication}
        applicationId={commission?.id as string}
        academicUnitId={academicUnitId as string}
        setConfirmModal={setConfirmModal}
        setResponseModal={setResponseModal}
        setRejectModal={setRejectModal}
        createVoting={createVoting}
        approveApplication={approveApplication}
      />
    </div>
  );
}

export default CommissionViewComponent;
