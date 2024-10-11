"use client";
import React, { useEffect, useState } from "react";
import SelectInput from "@components/atoms/inputs/SelectInput";
import MainButton from "@components/atoms/buttons/MainButton";
import SecondaryButton from "@components/atoms/buttons/SecondaryButton";
import Modal from "@components/templates/Modal";
import InfoUserItem from "../components/atoms/InfoUserItem";
import InputDisable from "@/modules/admin/components/molecules/InputDisable";
import ActiveBadge from "../components/atoms/ActiveBadge";

import User from "@/core/interfaces/user";
import {
  fetchUserById,
  assignRoleToUser,
} from "@/core/services/api/userService";
import { fetchAcademicUnits } from "@/core/services/api/academicUnitService";
import { fetchRoles } from "@/core/services/api/rolService";
import Link from "next/link";

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
      <div className="mt-14 max-w-3xl md:w-[650px] md:h-full border shadow-lg p-10 rounded-md">
        <h2 className="text-xl font-bold mb-3">Información del Usuario</h2>

        <div className="flex justify-between">
          <div>
            <InfoUserItem title="Nombre:" text={user.name} />
            <InfoUserItem title="Apellido:" text={user.last_name} />
            <InfoUserItem
              title="Tipo de Identificación:"
              text={user.identification_type}
            />
            <ActiveBadge isActive={user.is_active} />
          </div>
          <div>
            <InfoUserItem title="Email:" text={user.email} />

            <InfoUserItem
              title="Número de Identificación:"
              text={user.identification_number}
            />
            <InfoUserItem title="Teléfono:" text={user.phone} />
          </div>
        </div>

        <h2 className="text-xl font-bold mt-5 mb-3">Rol</h2>
        <ul className="list-disc mb-10">
          {user.user_roles_academic_units.map((roleAcademicUnit, index) => (
            <li key={index} className="mb-3 flex justify-between items-center">
              <InputDisable
                label={roleAcademicUnit.academic_unit.name}
                value={roleAcademicUnit.rol.name}
              />
            </li>
          ))}
        </ul>
        <div className="w-full flex gap-4 justify-between mt-4">
          <Link href="../user" className="w-full" >
            <SecondaryButton text="Salir" onClick={handleSubmit} />
          </Link>
          <MainButton text="Agregar Rol" onClick={() => setModal(true)} />
        </div>
      </div>

      {modal && (
        <Modal setModal={() => setModal(false)}>
          <h2 className="text-xl font-bold text-center my-3">Asignar Rol</h2>
          <form className="mb-4 flex flex-col gap-3">
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
