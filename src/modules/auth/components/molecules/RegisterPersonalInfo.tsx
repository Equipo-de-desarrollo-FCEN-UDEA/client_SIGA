"use client";

import TextInput from "@components/atoms/inputs/TextInput";
import SelectInput from "@components/atoms/inputs/SelectInput";

import { useState } from "react";

const RegisterPersonalInfo = () => {
  const [prueba, setPrueba] = useState("");
  const identificationType = ['CÉDULA DE CIUDADANÍA', 'CÉDULA DE EXTRANJERÍA', 'PASAPORTE', 'TARJETA DE IDENTIDAD', 'DOC. IDENT. DE EXTRANJEROS'];

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Apellidos:"
      />
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Nombres:"
      />
      <SelectInput onChange={(e) => setPrueba(e.target.value)} options={identificationType} label="Tipo de Identificación:" />
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Número de Identificación:"
      />
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Teléfono:"
      />
    </div>
  );
};

export default RegisterPersonalInfo;
