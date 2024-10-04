"use client"

import TextInput from "@/components/atoms/inputs/TextInput";
import { useState } from "react";

const RegisterConfirmation = () => {
  const [prueba, setPrueba] = useState("");

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Contraseña:"
      />
      <TextInput
        placeholder=""
        value={prueba}
        onChange={(e) => setPrueba(e.target.value)}
        label="Confirmar Contraseña:"
      />
    </div>
  )
}

export default RegisterConfirmation
