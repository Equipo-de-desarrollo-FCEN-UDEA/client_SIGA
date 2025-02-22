import { z } from "zod";

export const stepOneSchema = z.object({
  country: z.string().min(3, {
    message: "El país de destino destino debe tener al menos 3 caracteres",
  }),
  state: z.string().min(3, {
    message: "El Estado/Departamento/Región de destino debe tener al menos 3 caracteres",
  }),
  city: z.string().min(3, {
    message: "La ciudad de destino debe tener al menos 3 caracteres",
  }),
});


export const combinedSchema = z.object({
  stepOne: stepOneSchema,
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;
