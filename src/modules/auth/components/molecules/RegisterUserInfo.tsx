"use client"

import TextInput from "@/components/atoms/inputs/TextInput";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import { useState } from "react";

const RegisterUserInfo = () => {
  const [prueba, setPrueba] = useState("");
  
  const facultyOptions = ['FACULTAD DE CIENCIAS EXACTAS']
  const roleOptions = ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRATIVO']

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Correo Institucional:"
      />
      <SelectInput onChange={(e) => setPrueba(e.target.value)} options={facultyOptions} valueOptions={facultyOptions} value={prueba} label="Facultad:" />
      <SelectInput onChange={(e) => setPrueba(e.target.value)} valueOptions={facultyOptions} value={prueba} options={roleOptions} label="Facultad:" />
    </div>
  );
};

export default RegisterUserInfo;
