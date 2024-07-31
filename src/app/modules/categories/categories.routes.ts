import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { categoryController } from './categories.controller';
import { categoriesSchema } from './categories.schema';
const router = express.Router();

router.get('/category', categoryController.getAllCategoryController);

router.get('/category/:id', categoryController.getSingleCategoryController);

router.post(
  '/category',
  validateRequest(categoriesSchema.createCategorySchema),
  categoryController.createCategoryController,
);

router.patch(
  '/category/:id',
  validateRequest(categoriesSchema.updateCategorySchema),
  categoryController.updateCategoryController,
);

router.delete('/category/:id', categoryController.deleteCategoryController);

export const categoryRouter = router;
