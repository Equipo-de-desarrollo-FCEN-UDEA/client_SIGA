import { z } from "zod";
import { PurchaseType, PurchaseScope, AcademicsUnit } from '@/core/interfaces/applications/purchases/Purchase';

export const stepOneSchema = z.object({
    academicUnit: z.enum(Object.keys(AcademicsUnit) as [string, ...string[]], { message: "Seleccione una unidad académica válida" }),
    type: z.nativeEnum(PurchaseType, { message: "Seleccione un tipo válido" }),
    scope: z.nativeEnum(PurchaseScope, { message: "Seleccione un alcance válido" }),
    need: z.string().min(1, { message: "Este campo no puede estar vacío" }),
    description: z.string().min(1, { message: "Este campo no puede estar vacío" }),
    estimated_budget: z.preprocess((val) => Number(val), z.number()),

});

export const stepTwoSchema = z.object({
});

export const combinedSchema = z.object({
    stepOne: stepOneSchema,
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;