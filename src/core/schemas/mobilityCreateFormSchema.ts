import { z } from "zod";
import { 
  processArray, 
  typeArray, 
  purposeArray 
} from "@/modules/applications/mobility/utils/selectOptions";

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
});

export const stepTwoSchema = z.object({
  
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
