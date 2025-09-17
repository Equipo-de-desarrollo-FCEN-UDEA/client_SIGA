"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TextInput from "@components/atoms/inputs/TextInput";
import MainButton from "@components/atoms/buttons/MainButton";
import { useAuth } from "@/core/contexts/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login({ email, password });
      
      if (success) {
        // Get redirect path from URL params or default based on user role
        const urlParams = new URLSearchParams(window.location.search);
        const redirectPath = urlParams.get('redirect') || '/';
        router.push(redirectPath);
      } else {
        setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-16" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-4">
        <TextInput
          placeholder="Correo institucional"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
        />
        <TextInput
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="w-full flex justify-between text-darkGreen underline mb-10 mt-4">
        <Link href="/">
          <p>¿Olvidaste tu contraseña?</p>
        </Link>
        <Link href="../register">
          <p>Regístrate</p>
        </Link>
      </div>

      <MainButton 
        text={isLoading ? "Iniciando..." : "Iniciar Sesión"} 
        disabled={isLoading}
      />
    </form>
  );
}

export default LoginForm;
