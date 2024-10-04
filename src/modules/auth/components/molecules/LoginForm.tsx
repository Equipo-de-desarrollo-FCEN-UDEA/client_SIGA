"use client";

import { useState } from "react";
import Link from "next/link";

import TextInput from "@components/atoms/inputs/TextInput";
import MainButton from "@components/atoms/buttons/MainButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="mt-16">
      <div className="flex flex-col gap-y-4">
        <TextInput
          placeholder="Correo institucional"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></TextInput>
        <TextInput
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        ></TextInput>
      </div>

      <div className="w-full flex justify-between text-darkGreen underline mb-10">
        <Link href="/">
          <p>¿Olvidaste tu contraseña?</p>
        </Link>
        <Link href="../register">
          <p>Registrate</p>
        </Link>
      </div>

      <MainButton text="Iniciar Sesión"></MainButton>
    </form>
  );
}

export default LoginForm;
