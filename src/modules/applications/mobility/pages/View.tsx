"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import Mobility from '@/core/interfaces/applications/mobility/mobility'
import MobilityCRUD from '@/core/services/api/applications/mobility'
import View from '@/components/molecules/applications/View';


export default function Page({ id }: { id: string }) {
  const [mobility, setMobility] = useState<Mobility | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const sendToCommittee = async () => {
    await new MobilityCRUD().sendToCommittee(id);
    window.location.reload();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <View title="Movilidad" statuses={mobility?.status || []}>
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
      {mobility?.status?.[mobility.status.length - 1]?.name === 'CREADA' && 
        <>
          <p onClick={sendToCommittee}>Enviar</p> {/* El usuario confirma la información antes de ser enviada al comite */}
        </>
      }
    </>
  );
}