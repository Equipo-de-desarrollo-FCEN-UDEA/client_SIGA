import { z } from 'zod';

export const stepOneSchema = z.object({
  last_name: z.string(),
  name: z.string(),
  identification_type: z.string(),
  identification_number: z.string(),
  phone: z.string(),
});

export const stepTwoSchema = z.object({
  email: z.string().email(),
  faculty: z.string(),
  vinculation: z.string(),
  academic_unit: z.string(),
});

export const stepThreeSchema = z.object({
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
});