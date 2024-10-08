import React, { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import Link from 'next/link';

interface User {
    name: string;
    last_name: string;
    email: string;
    identification_type: string;
    identification_number: string;
    phone: string;
    is_active: boolean;
    id: UUID;
}

export default async function Home() {

    let data = await fetch('http://localhost:8003/api/v1/user?skip=0&limit=286');
    let users = await data.json();

    return (
      <>
        <h1>Lista de Usuarios</h1>
        <table className='table-auto border-collapse border border-slate-500 w-11/12'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Tipo de Identificación</th>
              <th>Número de Identificación</th>
              <th>Teléfono</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user:User) => (
                <tr key={user.id} className='py-2'>
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.identification_type}</td>
                  <td>{user.identification_number}</td>
                  <td>{user.phone != "NULL" ? (user.phone): ''}</td>
                  <td>{user.is_active ? 'Sí' : 'No'}</td>
                  <td><Link href={`user/${user.id}`}>editar</Link></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Cargando usuarios...</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
  