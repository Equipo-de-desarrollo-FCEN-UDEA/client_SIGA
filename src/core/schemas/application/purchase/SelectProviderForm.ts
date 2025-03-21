import { z } from "zod";


export const stepOneSchema = z.object({
    quotations: z
      .array(z.instanceof(File))
      .min(2, "Debe subir al menos dos cotizaciones"),
})

export const stepTwoSchema = z.object({
    marketPrices: z
      .array(z.instanceof(File))
      .min(1, "Debe subir al menos un archivo"),
})

export const stepThreeSchema = z.object({
    providerName: z.string().min(1, { message: "Este campo no puede estar vacío" }),
    providerEmail: z.string().email({ message: "Ingrese un correo electrónico válido" }),
    providerPhone: z.string().min(1, { message: "Este campo no puede estar vacío" }),
    providerId: z.string().min(1, { message: "Este campo no puede estar vacío" }),
})

export const combinedSchema = z.object({
    stepOne: stepOneSchema,
    stepTwo: stepTwoSchema,
    stepThree: stepThreeSchema,
})

export type StepOneFormData = z.infer<typeof stepOneSchema>
export type StepTwoFormData = z.infer<typeof stepTwoSchema>
export type StepThreeFormData = z.infer<typeof stepThreeSchema>

export type CombinedSchema = z.infer<typeof combinedSchema>