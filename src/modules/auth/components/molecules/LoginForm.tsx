"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import TextInput from "@components/atoms/inputs/TextInput";
import MainButton from "@components/atoms/buttons/MainButton";
import { useAuth } from "@/core/context/AuthContext";

function LoginForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login({ username, password });
      
      if (success) {
        // Redirect to admin page after successful login
        router.push("/admin/user");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
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

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="w-full flex justify-between text-darkGreen underline mb-10">
        <Link href="/">
          <p>¿Olvidaste tu contraseña?</p>
        </Link>
        <Link href="../register">
          <p>Registrate</p>
        </Link>
      </div>

      <MainButton 
        text={loading ? "Iniciando..." : "Iniciar Sesión"}
      ></MainButton>
    </form>
  );
}

export default LoginForm;
