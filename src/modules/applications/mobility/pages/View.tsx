"use client";
import React, { useState, useEffect } from 'react'
import Mobility from '@/core/interfaces/applications/mobility/mobility'
import MobilityCRUD from '@/core/services/api/applications/mobility'
import View from '@/components/molecules/applications/View';
import UserApplicationStatus from '@/core/interfaces/applications/applicationsStatus';
import { useSession } from '@/core/providers/SessionProvider'
import UserApplicationAcademicUnitService from '@/core/services/api/applications/user_application_academic_unit';
import UserApplicationAcademicUnit from '@/core/interfaces/applications/userApplicationAcademicUnit';

const Page = ({ id }: { id: string }) => {

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
    const userApplicationAcademicUnitService = new  UserApplicationAcademicUnitService();
    if (mobility) {
      setStatuses(mobility.status);
      const fetchData = async () => {
        try {
          const data = await userApplicationAcademicUnitService.getActive(mobility.id);
          setUserApplicationAcademicUnit(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
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
    <>
      <View title="Movilidad" statuses={statuses || []}>
        <div>
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
        </div>
        <div>
          <h4>Destino</h4>
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
      {
      mobility?.status?.[mobility.status.length - 1]?.name === 'CREADA' && 
        <>
          <button 
            onClick={sendToCommittee} 
            onKeyPress={(e) => { if (e.key === 'Enter') sendToCommittee(); }} 
            tabIndex={0}
            role="button"
          >
            Enviar
          </button> {/* El usuario confirma la información antes de ser enviada al comite */}
        </>
      }
      {statuses.length == 3 && user?.scopes && user.scopes.includes("representante:1a67f570-cede-4ae6-9cb6-2230eede37a1") &&(
        <button 
          onClick={sendToCommittee} 
          onKeyPress={(e) => { if (e.key === 'Enter') sendToCommittee(); }} 
          tabIndex={0}
          role="button"
        >
          Aprovar
        </button>
      )
      }
      {
        statuses.length == 4 && user?.scopes && user.scopes.includes("representante:"+userApplicationAcademicUnit?.academic_unit_id) &&(
            <button 
            onClick={sendToCommittee} 
            onKeyPress={(e) => { if (e.key === 'Enter') sendToCommittee(); }} 
            tabIndex={0}
            role="button"
            >
            Rechazar
            </button>
        )
      }
    </>
  );
}

export default Page