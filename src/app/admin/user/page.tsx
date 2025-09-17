"use client";

import { useState, useEffect } from "react";
import UsersTable from '../../../modules/admin/pages/UsersTable';
import { useAuth } from '../../../core/context/AuthContext';
import LoadingSpinner from '../../../components/molecules/LoadingSpinner';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading, isAdmin } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const response = await fetch("http://localhost:8003/api/v1/user?skip=0&limit=286", {
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); 
      }
    };

    // Only fetch users if user is authenticated and is admin
    if (user && isAdmin()) {
      fetchUsers();
    } else if (!authLoading && user && !isAdmin()) {
      // User is authenticated but not admin, redirect will be handled by middleware
      setLoading(false);
    }
  }, [user, authLoading, isAdmin]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoadingSpinner />;
  }

  if (!isAdmin()) {
    return (
      <div className="w-2/3 mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
        <p className="text-gray-600 mt-4">No tienes permisos de administrador para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 mx-auto">
      <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
        Bienvenido, {user.name} {user.last_name} - Administrador
      </div>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}

