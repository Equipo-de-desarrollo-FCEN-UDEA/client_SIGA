import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email_or_id: z.string().refine(
      (value) =>
        /^[0-9]+$/.test(value) ||
        /^[a-zA-Z0-9._%+-]+@udea\.edu\.co$/.test(value),
      {
        message:
          "Debe ingresar un correo institucional válido o un número de cédula numérico",
      }
    ),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
