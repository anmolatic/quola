import { z } from 'zod';

export const dataSchema = z.object({
  idNumber: z.string(),
  name: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  dateOfIssue: z.string().optional(),
  dateOfExpiry: z.string().optional(),
});

export const createSchema = dataSchema;

export type CreatePayload = z.infer<typeof createSchema>;

export const responseSchema = z.object({
  status: z.enum(['ok', 'error']),

  message: z.string().optional(),

  data: dataSchema.optional(),
});

export type ResponsePayload = z.infer<typeof responseSchema>;
