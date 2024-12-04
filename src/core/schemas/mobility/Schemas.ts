import { z } from "zod";
const stepOneSchema = z.object({
    total_time: z.number().int().positive().min(1, "El tiempo total debe ser mayor a 0")
});

export const combinedSchema = z.object({
    stepOne: stepOneSchema,
  });