import { z } from 'zod';

const createCategorySchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Category Title is required.' })
      .min(2, { message: 'Category title must have 2 characters.' }),
    icon: z
      .string({ required_error: 'Icon is required.' })
      .url({ message: 'Icon URL is required.' }),
    imageUrl: z
      .string({ required_error: 'Image is required.' })
      .url({ message: 'Image URL is required.' }),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Category Title is required.' })
      .min(2, { message: 'Category title must have 2 characters.' })
      .optional(),
    icon: z
      .string({ required_error: 'Icon is required.' })
      .url({ message: 'Icon URL is required.' })
      .optional(),
    imageUrl: z
      .string({ required_error: 'Image is required.' })
      .url({ message: 'Image URL is required.' })
      .optional(),
  }),
});

export const categoriesSchema = {
  createCategorySchema,
  updateCategorySchema,
};
