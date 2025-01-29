"use client";

import TextInput from "@/components/atoms/inputs/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forgotPasswordFormSchema } from "@/core/schemas/forgotPasswordFormSchema";
import MainButton from "@/components/atoms/buttons/MainButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import { forgotPasswordService } from "@/core/services/api/auth/forgotPasswordService";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email_or_id: string }>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const onSubmit = async (data: { email_or_id: string }) => {
    if (!data.email_or_id) {
        console.error("Email or id is missing");
        return;
        };
    try {
        const response = await forgotPasswordService(data.email_or_id);
        if (response && response.success) {
            alert("Se ha enviado un correo con las instrucciones para recuperar la contraseña");
            router.push("/auth");
        } else {
            console.error("Error al solicitar el cambio de contraseña", response?.message || "Error desconocido");
        }
        } catch (error) {
            alert("Error al solicitar el cambio de contraseña");
            console.error("Error al solicitar el cambio de contraseña", error);
        }
  };

    return (

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-2 text-3xl font-bold text-center text-darkGreen">SIGA UdeA</h1>
        <h1 className="mb-2 text-3xl font-bold text-center text-dark">Recuperar Contraseña</h1>
        <hr className="mt-3 mb-6" />

        <TextInput
          label="Correo Institucional o cédula"
          placeholder="ejemplo@udea.edu.co"
          {...register("email_or_id")}
          error={errors.email_or_id?.message?.toString() || undefined}
        />
        <div className="flex mt-6 gap-2">
          <SecondaryButton
            text="Cancelar"
            onClick={() => router.push("/auth")}
          />
          <MainButton text="Enviar" buttonType="submit" />
        </div>
      </form>
  );
};

export default ForgotPassword;
