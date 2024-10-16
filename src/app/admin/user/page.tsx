"use client"; // Directiva para asegurar que el componente se renderiza en el cliente

import { useState, useEffect } from "react";
import { UUID } from "crypto";
import Link from "next/link";

interface User {
  name: string;
  last_name: string;
  email: string;
  identification_type: string;
  identification_number: string;
  phone: string | null;
  is_active: boolean;
  id: UUID;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [skip, setSkip] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10; 

  const loadUsers = async (skip: number) => {
    const res = await fetch(
      `http://localhost:8003/api/v1/user?skip=${skip}&limit=${limit}`,
      {
        cache: "no-store", 
      }
    );

    const data = await res.json();

    if (data && Array.isArray(data)) {
      setUsers(data); 
      setTotalUsers(data.length); 
    }
  };

  useEffect(() => {
    loadUsers(skip);
  }, [skip]);

  const handleNextPage = () => {
    setSkip(skip + limit);

    console.log(skip);
  };

  const handlePreviousPage = () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
    console.log(skip);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Usuarios</h1>

      <table className="table-auto border-collapse border border-slate-500 w-full mb-4">
        <thead>
          <tr>
            <th className="border border-slate-600 px-4 py-2">Nombre</th>
            <th className="border border-slate-600 px-4 py-2">Apellido</th>
            <th className="border border-slate-600 px-4 py-2">Email</th>
            <th className="border border-slate-600 px-4 py-2">
              Tipo de Identificación
            </th>
            <th className="border border-slate-600 px-4 py-2">
              Número de Identificación
            </th>
            <th className="border border-slate-600 px-4 py-2">Teléfono</th>
            <th className="border border-slate-600 px-4 py-2">Activo</th>
            <th className="border border-slate-600 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user: User) => (
              <tr key={user.id} className="text-center">
                <td className="border border-slate-600 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {user.last_name}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {user.identification_type}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {user.identification_number}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {user.phone ? user.phone : "N/A"}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  {user.is_active ? "Sí" : "No"}
                </td>
                <td className="border border-slate-600 px-4 py-2">
                  <Link href={`user/${user.id}`}>Editar</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center p-4">
                No se encontraron usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePreviousPage}
          disabled={skip === 0}
        >
          Anterior
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={users.length < limit} // Si el número de usuarios es menor que el límite, ya no hay más
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
