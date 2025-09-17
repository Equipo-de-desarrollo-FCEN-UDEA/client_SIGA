"use client";

import { useState, useEffect } from "react";
import { useAuth } from '../../../core/context/AuthContext';
import LoadingSpinner from '../../../components/molecules/LoadingSpinner';


export default function Home() {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const response = await fetch("http://localhost:8003/api/v1/user?skip=0&limit=286", {
          credentials: "include",
        });
        const data = await response.json();
        setVotings(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); 
      }
    };

    // Only fetch data if user is authenticated
    if (user) {
      fetchUsers();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-2/3 mx-auto">
      <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
        Bienvenido, {user.name} {user.last_name} - Aplicaciones de Movilidad
      </div>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <h1>Datos de movilidad cargados: {votings.length} registros</h1>
      )}
    </div>
  );
}