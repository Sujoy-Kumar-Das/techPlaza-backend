import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { productController } from './products.controller';
import { productValidationSchemas } from './products.schema';
const router = express.Router();

router.post(
  '/product',
  validateRequest(productValidationSchemas.createProductSchema),
  productController.createProductController,
);

export const productRouter = router;
