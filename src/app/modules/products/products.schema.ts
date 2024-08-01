import { z } from 'zod';

const discountSchema = z
  .object({
    percentage: z
      .number()
      .min(0, { message: 'Discount percentage must be at least 0%' })
      .max(100, { message: 'Discount percentage cannot exceed 100%' }),
    startDate: z
      .string({ message: 'Start date must be a valid date' })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Start date must be a valid date',
      })
      .transform((val) => new Date(val))
      .refine((date) => date > new Date(), {
        message: 'Start date must be in the future',
      }),
    endDate: z
      .string({ message: 'End date must be a valid date' })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'End date must be a valid date',
      })
      .transform((val) => new Date(val)),
  })
  .superRefine((data, context) => {
    // console.log(data);
    if (data.endDate < data.startDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date must be after start date',
        path: ['endDate'],
      });
    }
  });

const createProductSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Product title is required.' })
      .min(3, { message: 'Title should be minimum 3 characters.' }),
    description: z
      .string({ required_error: 'Description is required.' })
      .min(50, { message: 'Description should be minimum 50 characters.' }),
    price: z
      .number({ required_error: 'Price is required.' })
      .min(0, { message: 'Price must be a positive number' }),
    category: z.string({ required_error: 'Category required.' }),
    stock: z.number().min(0, { message: 'Stock must be a positive number' }),
    thumbnail: z.string().url({ message: 'Thumbnail must be a valid URL' }),
    discount: discountSchema.optional(),
  }),
});

export const productValidationSchemas = {
  createProductSchema,
};
