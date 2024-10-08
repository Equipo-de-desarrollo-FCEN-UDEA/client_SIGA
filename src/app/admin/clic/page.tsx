'use client'
import React, { useEffect, useState } from 'react';

const ButtonPage = () => {
    
    const [academicUnits, setAcademicUnits] = useState([]);
    const [roles, setRoles] = useState([]);

    const [academicUnit, setAcademicUnit] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        try {

            const user_response = await fetch(`http://localhost:8003/api/v1/user/${id}`);
            const user = await user_response.json();

            const academic_unit_response = await fetch('http://localhost:8003/api/v1/academic_unit/get-all?skip=0&limit=10');
            const data = await academic_unit_response.json();

            const response_roles = await fetch('http://localhost:8003/api/v1/rol/get-all?skip=0&limit=10');
            const data_roles = await response_roles.json();
            setAcademicUnits(data);
            setRoles(data_roles);
            
        } catch (error) {
            console.error('Error al obtener las unidades académicas:', error);
        }
        };

        fetchData();
    }, []);

    const handleClick = () => {
    const userData = {
      rol_id:role, // Incluye el rol seleccionado
      academic_unit_id: academicUnit // Incluye la unidad académica seleccionada
    };

    console.log(userData)
  };

  return (
    <div>

        <div>
            <label>Seleccionar Rol:</label>
            <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            >
                <option value="" disabled>
                Selecciona un rol
                </option>
                {roles.map((role:any) => (
                <option key={role.id} value={role.id}>
                    {role.name}
                </option>
                ))}
            </select>
        </div>
        
        <div>
          <label>Seleccionar Unidad Académica:</label>
          <select
            id="academicUnit"
            value={academicUnit}
            onChange={(e) => setAcademicUnit(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona una unidad académica
            </option>
            {academicUnits.map((unit:any) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center h-screen">
        <button
            onClick={handleClick}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
            Haz clic aquí
        </button>
        </div>
    </div>
  );
};

export default ButtonPage;
