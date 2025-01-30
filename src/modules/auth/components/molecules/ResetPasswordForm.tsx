"use client"

import TextInput from "@/components/atoms/inputs/TextInput";
import { resetPasswordFormSchema } from "@/core/schemas/resetPasswordFormSchema";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import MainButton from "@/components/atoms/buttons/MainButton";
import { resetPasswordService } from "@/core/services/api/auth/resetPasswordService";

// Definir la interfaz para las props
interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onSubmit = async (data: any) => {
    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      await resetPasswordService(data.new_password, token);
      alert('Contraseña actualizada con éxito');
    } catch (error) {
      alert('Error al actualizar la contraseña');
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-2 text-3xl font-bold text-center text-darkGreen">SIGA UdeA</h1>
      <h1 className="mb-2 text-3xl font-bold text-center text-dark">Cambiar Contraseña</h1>
      <TextInput
        placeholder=""
        type="password"
        label="Nueva Contraseña:"
        {...register("new_password")}
        error={errors.new_password?.message?.toString() || undefined}
      />
      <TextInput
        placeholder=""
        type="password"
        label="Confirmar Contraseña:"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message?.toString() || undefined}
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

export default ResetPasswordForm;