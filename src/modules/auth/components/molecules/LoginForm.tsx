"use client";

import { useState } from "react";
import Link from "next/link";
import TextInput from "@components/atoms/inputs/TextInput";
import MainButton from "@components/atoms/buttons/MainButton";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const formData = new FormData();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8003/api/v1/auth/access-token", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      console.log("REsponse", response);
      if (response.status === 200) {
        router.push("/admin/user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="mt-16" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-4">
        <TextInput
          placeholder="Correo institucional"
          onChange={handleChange}
          value={credentials.username}
          name="username"
        />
        <TextInput
          placeholder="Contraseña"
          onChange={handleChange}
          value={credentials.password}
          name="password"
          type="password"
        />
      </div>

      <div className="w-full flex justify-between text-darkGreen underline mb-10">
        <Link href="/">
          <p>¿Olvidaste tu contraseña?</p>
        </Link>
        <Link href="/auth/register">
          <p>Registrate</p>
        </Link>
      </div>

      <MainButton text="Iniciar Sesión" buttonType="submit" />
    </form>
  );
}

export default LoginForm;
