import { z } from "zod";
import { } from '@/core/interfaces/applications/purchases/Purchase';

export const stepOneSchema = z.object({
    responsibleCondition: z.string().min(1, { message: "Este campo no puede estar vacío" }),
});

export const stepTwoSchema = z.object({
    marcoAgreement: z.union([z.enum(["true", "false"], { message: "Selecione una opción" }), z.boolean()]),
});

export const stepThreeSchema = z.object({
    annualPlanIsTrue: z.union([z.enum(["true", "false"], { message: "Selecione una opción" }), z.boolean()]),
    annualPlanCode: z.string().optional().nullable(),
    bankConsultationIsTrue: z.union([z.enum(["true", "false"], { message: "Selecione una opción" }), z.boolean()]),
    bankConsultationCode: z.string().optional().nullable(),
    contract: z.string().optional().nullable(),
});

export const combinedSchema = z.object({
    stepOne: stepOneSchema,
    stepTwo: stepTwoSchema,
    stepThree: stepThreeSchema,
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

export type CombinedSchema = z.infer<typeof combinedSchema>;