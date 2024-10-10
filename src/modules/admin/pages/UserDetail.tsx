"use client";
import React, { useEffect, useState } from "react";
import SelectInput from "@components/atoms/inputs/SelectInput";
import MainButton from "@components/atoms/buttons/MainButton";
import Modal from "@components/templates/Modal";
import InfoUserItem from "../components/atoms/InfoUserItem";
import RolUserItem from "../components/molecules/RolUserItem";
import InputDisable from "@components/atoms/inputs/InputDisable";

import User from "@/core/interfaces/user";
import {
  fetchUserById,
  assignRoleToUser,
} from "@/core/services/api/userService";
import { fetchAcademicUnits } from "@/core/services/api/academicUnitService";
import { fetchRoles } from "@/core/services/api/rolService";

export default function UserDetail({ id }: { id: string | string[] }) {
  const [user, setUser] = useState<User | null>(null);
  const [academicUnits, setAcademicUnits] = useState([]);
  const [roles, setRoles] = useState([]);

  const [modal, setModal] = useState(false);

  const [academic_unit_id, setAcademicUnit] = useState("");
  const [rol_id, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data_user = await fetchUserById(id);
      const data_academic_unit = await fetchAcademicUnits();
      const data_roles = await fetchRoles();

      setUser(data_user);
      setAcademicUnits(data_academic_unit);
      setRoles(data_roles);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const userData = {
      user_id: user?.id,
      rol_id, // Incluye el rol seleccionado
      academic_unit_id, // Incluye la unidad académica seleccionada
    };

    assignRoleToUser(JSON.stringify(userData));
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

        <InputDisable label="Nombre:" value={user.name} />
        <InputDisable label="Apellido:" value={user.last_name} />
        <InputDisable label="Email:" value={user.email} />
        <InputDisable
          label="Tipo de Identificación:"
          value={user.identification_type}
        />
        <InputDisable
          label="Número de Identificación:"
          value={user.identification_number}
        />
        <InputDisable label="Teléfono:" value={user.phone} />
        <InputDisable label="Activo:" value={user.is_active ? "Sí" : "No"} />

        {/* <InfoUserItem title="Nombre:" text={user.name} />
        <InfoUserItem title="Apellido:" text={user.last_name} />
        <InfoUserItem title="Email:" text={user.email} />
        <InfoUserItem
          title="Tipo de Identificación:"
          text={user.identification_type}
        />
        <InfoUserItem
          title="Número de Identificación:"
          text={user.identification_number}
        />
        <InfoUserItem title="Teléfono:" text={user.phone} />
        <InfoUserItem title="Activo:" text={user.is_active ? "Sí" : "No"} /> */}

        <div className="border-t border-gray-300 my-4"></div>

        <h2 className="text-xl font-bold text-center mb-3">Rol</h2>
        <ul className="list-disc mb-10">
          {user.user_roles_academic_units.map((roleAcademicUnit, index) => (
            <li key={index} className="mb-3 flex justify-between items-center">
              <RolUserItem
                academic_unit={roleAcademicUnit.academic_unit.name}
                academic_rol={roleAcademicUnit.rol.name}
              />
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
        <Modal setModal={() => setModal(false)}>
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
