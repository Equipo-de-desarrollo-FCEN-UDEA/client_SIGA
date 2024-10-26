"use client";

import { use, useState } from "react";
import Link from "next/link";
import axios from 'axios';

import TextInput from "@components/atoms/inputs/TextInput";
import MainButton from "@components/atoms/buttons/MainButton";
import handler from "@/core/services/api/login";

function LoginForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8003/api/v1/auth/access-token", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="mt-16" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-4">
        <TextInput
          placeholder="Correo institucional"
          onChange={(e) => setEmail(e.target.value)}
          value={username}
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
