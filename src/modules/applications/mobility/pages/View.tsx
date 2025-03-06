"use client";
import React, { useState, useEffect } from 'react'
import Mobility from '@/core/interfaces/applications/mobility/mobility'
import MobilityCRUD from '@/core/services/api/applications/mobility'
import View from '@/components/molecules/applications/View';
import UserApplicationStatus from '@/core/interfaces/applications/applicationsStatus';
import { useSession } from '@/core/providers/SessionProvider'
import UserApplicationAcademicUnitService from '@/core/services/api/applications/user_application_academic_unit';
import UserApplicationAcademicUnit from '@/core/interfaces/applications/userApplicationAcademicUnit';
import Response from '@/modules/applications/components/molecules/Response';
import MainButton from '@/components/atoms/buttons/MainButton';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import Modal from '@/components/templates/Modal';

const Page = ({ id }: { id: string }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [mobility, setMobility] = useState<Mobility | null>(null);
  const [userApplicationAcademicUnit, setUserApplicationAcademicUnit] = useState<UserApplicationAcademicUnit | null>(null);
  const [statuses, setStatuses] = useState<UserApplicationStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();

  useEffect(() => {
    const mobilityCRUD = new MobilityCRUD();
    const fetchData = async () => {
      try {
        const data = await mobilityCRUD.getById(id);
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

  useEffect(() => {
    const userApplicationAcademicUnitService = new UserApplicationAcademicUnitService();
    if (mobility) {
      setStatuses(mobility.status);
      const fetchData = async () => {
        try {
          const data = await userApplicationAcademicUnitService.getActive(
            mobility.id as string);
          setUserApplicationAcademicUnit(data);
        } catch {
          setUserApplicationAcademicUnit(null);
        }
      };
      fetchData();
    }
  }, [mobility]);

  const sendToCommittee = async () => {
    await new MobilityCRUD().sendToCommittee(id);
    window.location.reload();
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
        </div>
      </View>

      <div className='flex gap-4'>
        <SecondaryButton text='Editar' />
        {
        mobility?.status?.[mobility.status.length - 1]?.name === 'CREADA' &&
          <MainButton text="Enviar" onClick={() => setConfirmModal(true)} />
        }

        { userApplicationAcademicUnit && user?.scopes && user.scopes.includes("representante:" + userApplicationAcademicUnit?.academic_unit_id) && (
        <MainButton text="Responder" onClick={() => setModal(true)} />
        )}
      </div>

      {modal && (
        <Response
          user_application_id={mobility?.id as string}
          academic_unit_id={userApplicationAcademicUnit?.academic_unit_id as string}
        />
      )}

      {confirmModal && (
        <Modal setModal={() => setConfirmModal(false)}>
          <h3 className="text-lg font-bold mb-4">¿Estás seguro de que deseas enviar esta solicitud?</h3>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => setConfirmModal(false)} />
            <MainButton text="Confirmar" onClick={sendToCommittee} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Page
