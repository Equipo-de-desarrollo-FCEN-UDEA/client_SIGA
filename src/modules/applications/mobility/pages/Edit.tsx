"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import Mobility from '@/core/interfaces/applications/mobility/mobility'
import MobilityCRUD from '@/core/services/api/applications/mobility'


export default function Page({ id }: { id: string }) {
  const [mobility, setMobility] = useState<Mobility | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null >(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <p>{mobility?.process}</p>
    </>
  );
}