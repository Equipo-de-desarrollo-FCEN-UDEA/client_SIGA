import { z } from "zod";
import ProcessEnum from '@/core/interfaces/applications/mobility/process';
import TypeEnum from '@/core/interfaces/applications/mobility/type';
import PurposeEnum from '@/core/interfaces/applications/mobility/purpose';

const MAX_DAYS = 30;

export const stepOneSchema = z.object({
  process: z
  .nativeEnum(ProcessEnum, {
    errorMap: () => ({ message: "Seleccione un proceso válido" }),
  }),
  type: z
    .nativeEnum(TypeEnum, {
      errorMap: () => ({ message: "Seleccione un tipo válido" }),
    }),
  purpose: z
    .nativeEnum(PurposeEnum, {
      errorMap: () => ({ message: "Seleccione un propósito válido" }),
    }),
  destination_country: z.string().min(3, {
    message: "El país destino debe tener al menos 3 caracteres",
  }),
  date_start: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio no es válida.",
  }),
  date_end: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de fin no es válida.",
  })
});

export const stepTwoSchema = z.object({
  destination_institution: z.string().min(3, {
    message: "La institución de destino debe tener al menos 3 caracteres",
  }),
  academic_program: z.string().min(3, {
    message: "El programa académico debe tener al menos 3 caracteres",
  }),
  name_contact_person: z.string().min(3, {
    message: "El nombre del contacto debe tener al menos 3 caracteres",
  }),
  cellphone_contact_person: z.string().min(3, {
    message: "El celular del contacto debe tener al menos 9 caracteres",
  }),
  email_contact_person: z.string().email({
    message: "El correo del contacto debe ser válido",
  })
});

export const stepThreeSchema = z.object({
  admissionLetter: z
    .array(z.instanceof(File))
    .min(1, { message: "La carta de aceptación es requerida"}),
  enrollmentCertificate: z
    .array(z.instanceof(File))
    .min(1, { message: "El certificado de matrícula es requerido" }),
  insurance: z
    .array(z.instanceof(File))
    .optional(),
  passport: z
    .array(z.instanceof(File))
    .optional(),
});


export const combinedSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

export type MobilityFormSchema = z.infer<typeof combinedSchema>;
