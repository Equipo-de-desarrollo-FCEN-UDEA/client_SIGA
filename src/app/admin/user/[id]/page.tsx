"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UUID } from "crypto";
import { Icon } from "@iconify/react";

import SelectInput from "@components/atoms/inputs/SelectInput";
import MainButton from "@components/atoms/buttons/MainButton";
import Modal from '@components/templates/Modal'

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

  const [modal, setModal] = useState(false);

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

  useEffect(() => {
    console.log('academic_unit_id: ' + academic_unit_id)
  }, [academic_unit_id])
  

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
    <div className="flex flex-col md:flex-row md:flex-wrap md:gap-4 justify-center items-center">
      <div className="mt-14 max-w-3xl md:w-[500px] md:h-full border shadow-lg p-10 rounded-md">
        <h2 className="text-xl font-bold text-center mb-3">
          Información del Usuario
        </h2>

        <div className="flex">
          <strong>Nombre:</strong>
          <p className="secondary-text ml-2 mb-1">{user.name}</p>
        </div>
        <div className="flex">
          <strong>Apellido:</strong>
          <p className="secondary-text ml-2 mb-1">{user.last_name}</p>
        </div>
        <div className="flex">
          <strong>Email:</strong>
          <p className="secondary-text ml-2 mb-1">{user.email}</p>
        </div>
        <div className="flex">
          <strong>Tipo de Identificación:</strong>
          <p className="secondary-text ml-2 mb-1">{user.identification_type}</p>
        </div>
        <div className="flex">
          <strong>Número de Identificación:</strong>
          <p className="secondary-text ml-2 mb-1">
            {user.identification_number}
          </p>
        </div>
        <div className="flex">
          <strong>Teléfono:</strong>
          <p className="secondary-text ml-2 mb-1">{user.phone}</p>
        </div>
        <div className="flex">
          <strong>Activo:</strong>
          <p className="secondary-text ml-2 mb-1">
            {user.is_active ? "Sí" : "No"}
          </p>
        </div>
        <div className="border-t border-gray-300 my-4"></div>

        <h2 className="text-xl font-bold text-center mb-3">Rol</h2>
        <ul className="list-disc mb-10">
          {user.user_roles_academic_units.map((roleAcademicUnit, index) => (
            <li key={index} className="mb-3 flex justify-between items-center">
              <div>
                <p>
                  {roleAcademicUnit.academic_unit.name}
                  <br />{" "}
                </p>{" "}
                <strong>{roleAcademicUnit.rol.name}</strong>
              </div>
              <a href="">
                <Icon
                  icon="material-symbols:delete-outline"
                  className="text-xl text-red-700"
                />
              </a>
            </li>
          ))}
          <div className="w-full text-end">
            <p
              className="underline cursor-pointer inline-block"
              onClick={() => setModal(true)}
            >
              Agregar Rol
            </p>
          </div>
        </ul>
        <div className="mt-4">
          <MainButton text="Salir" onClick={handleSubmit} />
        </div>
      </div>

      {modal && (
        <Modal setModal={() => setModal(false)} >
          <h2 className="text-xl font-bold text-center my-3">Asignar Rol</h2>
            <form className="mb-4">
              <SelectInput
                value={rol_id}
                onChange={(e) => setRole(e.target.value)}
                options={roles.map((role: any) => role.name)}
                valueOptions={roles.map((role: any) => role.id)}
                label="Seleccionar un Rol:"
                placeholder="Seleccione una opción...."
                />
              <SelectInput
                value={academic_unit_id}
                onChange={(e) => setAcademicUnit(e.target.value)}
                options={academicUnits.map((unit: any) => unit.name)}
                valueOptions={academicUnits.map((unit: any) => unit.id)}
                label="Seleccionar Unidad Académica:"
                placeholder="Seleccione una opción...."
              />
            </form>
            <div className="mt-16">
              <MainButton text="Guardar" onClick={handleSubmit} />
            </div>
        </Modal>
      )}
    </div>
  );
}
