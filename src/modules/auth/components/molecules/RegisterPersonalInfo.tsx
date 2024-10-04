"use client";

import TextInput from "@components/atoms/inputs/TextInput";
import { useState } from "react";

const RegisterPersonalInfo = () => {
  const [prueba, setPrueba] = useState("");

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
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Tipo de Identificación:"
      />
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
