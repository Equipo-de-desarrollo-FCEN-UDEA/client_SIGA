import { z } from "zod";

export const stepOneSchema = z.object({
  last_name: z.string().min(3, {
    message: "El apellido debe tener al menos 3 caracteres",
  }),
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  identification_type: z
    .string()
    .refine(
      (identification_type) =>
        [
          "cedula_ciudadania",
          "cedula_extranjeria",
          "pasaporte",
          "tarjeta_de_identidad",
        ].includes(identification_type),
      {
        message: "Seleccione un tipo de identificación válido",
      }
    ),
  identification_number: z
    .string()
    .min(6, {
      message: "Ingrese un número de identificación válido",
    })
    .refine((identification_number) => !isNaN(Number(identification_number)), {
      message: "El número de identificación debe ser un número",
    }),
  phone: z
    .string()
    .min(4, {
      message: "Ingrese un número de teléfono válido",
    })
    .refine((phone) => !isNaN(Number(phone)), {
      message: "El número de teléfono debe ser un número",
    }),
});

export const stepTwoSchema = z.object({
  email: z
    .string()
    .email({
      message: "El correo electrónico debe ser válido",
    })
    .endsWith("@udea.edu.co", {
      message: "El correo electrónico debe ser institucional",
    }),
  faculty: z
    .string()
    .refine((faculty) => ["FACULTAD DE CIENCIAS EXACTAS"].includes(faculty), {
      message: "La facultad seleccionada no es válida",
    }),
  vinculation: z.string().refine((vinculation) => 
    ["PROFESOR", "ESTUDIANTE PREGRADO", "ESTUDIANTE POSGRADO", "ADMINISTRATIVO"].includes(vinculation), {
    message: "La vinculación seleccionada no es válida",
    }
  ),
  academic_unit: z.string().min(1, {
    message: "Seleccione una unidad académica",
  }),
});

export const stepThreeSchema = z
  .object({
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });


export const combinedSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
});