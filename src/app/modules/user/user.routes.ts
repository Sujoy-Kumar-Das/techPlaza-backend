import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './user.controler';
import { userValidationSchema } from './user.schema';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidationSchema),
  userController.createUser,
);

export const userRouter = router;
