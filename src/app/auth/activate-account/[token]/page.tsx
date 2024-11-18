"use client";

import { useEffect } from "react";
import { activateAccount } from "src/core/services/api/auth/authService";

export default function Page({ params }: { params: { token: string } }) {

  const handleActivateAccount = async () => {
    try {
      const response = await activateAccount(params.token);
      console.log("Cuenta activada:", response);
    } catch (error) {
      console.error("Error al activar la cuenta:", error);
    }
  };

  useEffect(() => {
    handleActivateAccount();
  }, []);

  return (
    <div>
      Activando cuenta...
    </div>
  );
}