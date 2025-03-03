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

export const stepTwoSchema = z.object({
  date_start: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio no es válida.",
  }),
});

export const stepThreeSchema = z.object({
  reason: z.string().min(5, {
    message: "La razón de la comisión debe tener al menos 5 caracteres",
  }),
  justification: z.string().min(10, {
    message: "La justificación de la comisión debe tener al menos 10 caracteres",
  }),
});

export const stepFourSchema = z.object({
  documents: z.array(z.string(
  )),
});


export const combinedSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
  stepFour: stepFourSchema,
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type StepThreeFormData = z.infer<typeof stepThreeSchema>;
export type StepFourFormData = z.infer<typeof stepFourSchema>;
