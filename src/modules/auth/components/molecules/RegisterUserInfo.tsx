"use client"

import TextInput from "@/components/atoms/inputs/TextInput";
import { useState } from "react";

const RegisterUserInfo = () => {
  const [prueba, setPrueba] = useState("");
  
  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Correo Institucional:"
      />
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Facultad:"
      />
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Cargo:"
      />
    </div>
  );
};

export default RegisterUserInfo;
