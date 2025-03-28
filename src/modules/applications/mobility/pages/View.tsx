"use client";
import React, { useState, useEffect } from 'react'
import Mobility from '@/core/interfaces/applications/mobility/mobility'
import MobilityCRUD from '@/core/services/api/applications/mobility'
import View from '@/components/molecules/applications/View';
import UserApplicationStatus from '@/core/interfaces/applications/applicationsStatus';
import { useSession } from '@/core/providers/SessionProvider'
import Status from '@/modules/applications/components/molecules/Status';
import Response from '@/modules/applications/components/molecules/Response';
import MainButton from '@/components/atoms/buttons/MainButton';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import Modal from '@/components/templates/Modal';
import UserApplication from '@/core/interfaces/applications/userApplication';
import UserApplicationService from '@/core/services/api/applications/user_application';
import { UUID } from 'crypto';

const Page = ({ id }: { id: string }) => {

  const [userApplication, setUserApplication] = useState<UserApplication | null>(null);

  const [modal, setModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [mobility, setMobility] = useState<Mobility | null>(null);
  const [statuses, setStatuses] = useState<UserApplicationStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();

  //modals
  const [statusModal, setStatusModal] = useState<boolean>(false);

  useEffect(() => {
    const userApplicationService = new UserApplicationService();
    const mobilityCRUD = new MobilityCRUD();
    const fetchData = async () => {
      try {
        const data = await mobilityCRUD.getById(id);
        const userApplicationData = await userApplicationService.getById(id);

        setUserApplication(userApplicationData);
        setMobility(data);
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

  const sendToCommittee = async () => {
    await new MobilityCRUD().sendToCommittee(id);
    window.location.reload();
  }

  const createVoting = async () => {
    const academicUnitId = userApplication?.user_application_academic_units[0]?.academic_unit.id;
    if (academicUnitId) {
      await new MobilityCRUD().advanceMobilityStatus(id as UUID, { academic_unit_id: academicUnitId }, true);
      window.location.reload();
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='max-w-2xl border shadow-lg p-10 rounded-md mx-auto mt-3'>
      <View title="Ver Movilidad" statuses={statuses || []}>
        <div className='grid grid-cols-3 grid-rows-2 gap-4 my-6'>
          <div>
            <h5>Proceso</h5>
            <p>{mobility?.process}</p>
          </div>
          <div>
            <h5>Tipo</h5>
            <p>{mobility?.type}</p>
          </div>
          <div>
            <h5>Objetivo</h5>
            <p>{mobility?.purpose}</p>
          </div>
          <div>
            <h5>País</h5>
            <p>{mobility?.destination_country}</p>
          </div>
          <div>
            <h5>Institución</h5>
            <p>{mobility?.destination_institution}</p>
          </div>
          <div>
            <h5>Academic unit actual</h5>
            <p>{userApplication?.user_application_academic_units[0]?.academic_unit.name}</p>
          </div>
        </div>
        <SecondaryButton text="Ver estados de la solicitud" onClick={() => setStatusModal(true)} />
      </View>

      <div className='flex gap-4 my-3'>
        {
          userApplication?.user_application_status[0].status.name === 'CREATED' &&
          user?.scopes.includes("representante:" + userApplication?.user_application_academic_units[0]?.academic_unit.id) &&
          <MainButton text="Enviar a votación" onClick={() => setConfirmModal(true)} />
        }

        {userApplication?.user_application_academic_units[0] && user?.scopes && user.scopes.includes("representante:" + userApplication?.user_application_academic_units[0]?.academic_unit_id) && (
          <MainButton text="Responder" onClick={() => setModal(true)} />
        )}
      </div>

      {modal && (
        <Response
          user_application_id={mobility?.id as string}
          academic_unit_id={userApplication?.user_application_academic_units[0]?.academic_unit_id as string}
        />
      )}

      {statusModal && userApplication && (
        <Status status={userApplication?.user_application_status} setStatusModal={setStatusModal} />
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
    </div>
  );
}

export default Page
