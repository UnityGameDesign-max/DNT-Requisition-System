// src/schemas/validationSchema.ts
import { z } from 'zod';


export const AuthCredentialsValidator = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
});


export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>