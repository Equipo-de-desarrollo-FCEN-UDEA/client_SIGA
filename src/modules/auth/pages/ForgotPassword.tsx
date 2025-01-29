"use client";

import TextInput from "@/components/atoms/inputs/TextInput";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forgotPasswordFormSchema } from "@/core/schemas/forgotPasswordFormSchema";
import MainButton from "@/components/atoms/buttons/MainButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const onSubmit = async (data: any) => {
  };

  return (
    <div className="w-1/3 border shadow-lg p-10 rounded-md grid place-items-center">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

        <h1 className="text-center">Recupera tu contraseña</h1>
        <hr className="mt-3 mb-6" />

        <TextInput
          label="Correo Institucional o cédula"
          placeholder="ejemplo@udea.edu.co"
          {...register("forgotPassword")}
          error={errors.forgotPassword?.message?.toString() || undefined}
        />
        <div className="flex mt-6 gap-2">
          <SecondaryButton
            text="Cancelar"
            onClick={() => router.push("/auth")}
          />
          <MainButton text="Enviar" buttonType="submit" />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
