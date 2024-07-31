import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './user.controler';
import { managerValidationSchema, userValidationSchema } from './user.schema';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidationSchema),
  userController.createUser,
);

router.post(
  '/create-manager',
  validateRequest(managerValidationSchema),
  userController.createManager,
);

router.post(
  '/create-admin',
  validateRequest(managerValidationSchema),
  userController.createAdmin,
);

export const userRouter = router;
