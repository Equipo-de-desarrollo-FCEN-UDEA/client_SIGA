"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UUID } from "crypto";
import Link from "next/link";

// Definir la interfaz del usuario
interface User {
  name: string;
  last_name: string;
  email: string;
  identification_type: string;
  identification_number: string;
  phone: string;
  is_active: boolean;
  id: UUID;
  user_roles_academic_units: RolAcademicUnit[];
}

interface RolAcademicUnit {
  rol: Rol;
  academic_unit: AcademicUnit;
}

interface AcademicUnit {
  name: string;
}

interface Rol {
  name: string;
  description: string;
}

export default function UserDetail() {
  // Obtener el ID del usuario
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [academicUnits, setAcademicUnits] = useState([]);
  const [roles, setRoles] = useState([]);

  const [academic_unit_id, setAcademicUnit] = useState("");
  const [rol_id, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_response = await fetch(
          `http://localhost:8003/api/v1/user/${id}`
        );
        const data_user = await user_response.json();

        const academic_unit_response = await fetch(
          "http://localhost:8003/api/v1/academic_unit/get-all?skip=0&limit=50"
        );
        const data_academic_unit = await academic_unit_response.json();

        const response_roles = await fetch(
          "http://localhost:8003/api/v1/rol/get-all?skip=0&limit=10"
        );
        const data_roles = await response_roles.json();

        setUser(data_user);
        setAcademicUnits(data_academic_unit);
        setRoles(data_roles);
      } catch (error) {
        console.error("Error al obtener las unidades académicas:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const userData = {
      user_id: user?.id,
      rol_id, // Incluye el rol seleccionado
      academic_unit_id, // Incluye la unidad académica seleccionada
    };

    console.log(JSON.stringify(userData));

    try {
      const response = await fetch(
        "http://localhost:8003/api/v1/user_rol_academic_unit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Datos enviados con éxito:", responseData);
        window.location.reload();
      } else {
        console.error("Error al enviar los datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  if (!user) {
    return <div>Cargando información del usuario...</div>;
  }

  // Mostrar la información del usuario
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-14 max-w-3xl border shadow-lg p-10 rounded-md">
        <h2 className="text-xl font-bold text-center mb-3">Información del Usuario</h2>
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Apellido:</strong> {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> <p>{user.email}</p>
        </p>
        <p>
          <strong>Tipo de Identificación:</strong> {user.identification_type}
        </p>
        <p>
          <strong>Número de Identificación:</strong>{" "}
          {user.identification_number}
        </p>
        <p>
          <strong>Teléfono:</strong> {user.phone}
        </p>
        <p>
          <strong>Activo:</strong> {user.is_active ? "Sí" : "No"}
        </p>

        <p>
          <strong>Roles:</strong>
        </p>
        <ul>
          {user.user_roles_academic_units.map((roleAcademicUnit, index) => (
            <li key={index}>
              {roleAcademicUnit.rol.name} -{" "}
              {roleAcademicUnit.academic_unit.name}
            </li>
          ))}
        </ul>

        <h2>Roles</h2>
        <form>
          <div>
            <label htmlFor="role">Seleccionar Rol:</label>
            <select
              id="role"
              value={rol_id}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecciona un rol
              </option>
              {roles.map((role: User) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="academicUnit">Seleccionar Unidad Académica:</label>
            <select
              id="academicUnit"
              value={academic_unit_id}
              onChange={(e) => setAcademicUnit(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecciona una unidad académica
              </option>
              {academicUnits.map((unit: any) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Haz clic aquí
          </button>
        </div>
      </div>
    </div>
  );
}
