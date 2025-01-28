import { z } from "zod";
import { 
  processArray, 
  typeArray, 
  purposeArray 
} from "@/modules/applications/mobility/utils/selectOptions";

const MAX_DAYS = 30;

export const stepOneSchema = z.object({
  process: z
    .string()
    .refine(
      (processItem) => processArray.includes(processItem),
      { message: "Seleccione un tipo de proceso válido" }
    ),
  type: z
    .string()
    .refine(
      (typeItem) => typeArray.includes(typeItem),
      { message: "Seleccione un tipo válido" }
    ),
  purpose: z
    .string()
    .refine(
      (purposeItem) => purposeArray.includes(purposeItem),
      { message: "Seleccione un propósito válido" }
    ),
  destination_country: z.string().min(3, {
    message: "El país destino debe tener al menos 3 caracteres",
  }),
  date_start: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio no es válida.",
  }),
  date_end: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de fin no es válida.",
  })
}).refine(({ date_start, date_end }) => {
  const start = new Date(date_start);
  const end = new Date(date_end);
  const diffInDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= MAX_DAYS;
}, {
  message: `La fecha de finalización no debe exceder los ${MAX_DAYS} días de diferencia.`,
  path: ["date_end"]
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
 
});


export const combinedSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type StepThreeFormData = z.infer<typeof stepThreeSchema>;
