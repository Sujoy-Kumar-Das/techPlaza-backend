import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required.' }),
  middleName: z.string().optional(),
  lastName: z.string().min(3, { message: 'Last Name is required.' }),
});

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long.')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  .regex(/\d/, 'Password must contain at least one digit.')
  .regex(
    /[^a-zA-Z0-9]/,
    'Password must contain at least one special character.',
  );

export const userValidationSchema = z.object({
  body: z.object({
    name: fullNameSchema,
    email: z.string().email('Invalid email format'),
    password: passwordSchema,
    isPasswordChange: z.boolean().default(false),
    lastPasswords: z.array(z.string()).default([]),
    lastPasswordChangeAt: z.date().optional(),
    wrongPasswordAttempt: z.number().default(0),
    role: z.string({ required_error: 'Enter your role.' }).default('user'),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: z.boolean().default(false),
  }),
});
