"use client";

import TextInput from "@/components/atoms/inputs/TextInput";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ResetPasswordFormSchema } from "@/core/schemas/ResetPasswordFormSchema";
import { resetPasswordService } from "@/core/services/api/auth/resetPasswordService";
import MainButton from "@/components/atoms/buttons/MainButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

const ResetPassword = ({params}:{params:{token:string, new_password: string}}) => {

  const handleResetPassword = async (data: any) => {
    try {
      const response = await resetPasswordService(params.token, data.new_password);
      console.log("Contraseña restablecida:", response);
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
    }
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const onSubmit = (data: any) => {
    handleResetPassword(data);
    console.log("ONSUMBIT", data);
  };

  return (
    <div className="w-1/3 border shadow-lg p-10 rounded-md grid place-items-center">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

        <h1 className="text-center">Restablece tu contraseña</h1>
        <hr className="mt-3 mb-6" />

        <TextInput
          label="Nueva contraseña"
          placeholder="********"
          type="password"
          {...register("new_password")}
          error={errors.new_password?.message?.toString() || undefined}
        />
        <TextInput
          label="Confirma tu nueva contraseña"
          placeholder="********"
          type="password"
          {...register("confirm_password")}
          error={errors.confirm_password?.message?.toString() || undefined}
        />
        <div className="flex mt-6 gap-2">
          <SecondaryButton
            text="Cancelar"
            onClick={() => router.push("/auth")}
          />
          <MainButton text="Cambiar" buttonType="submit" />
        </div>
      </form>
    </div>
  );

}

export default ResetPassword;