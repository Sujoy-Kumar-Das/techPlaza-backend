import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserService = async (payload: IUser) => {
  const {
    email,
    name: { firstName, middleName, lastName },
  } = payload;

  const user = await userModel.isUserExists(email);
  const existsErrorMessage = `${firstName} ${middleName ? `${middleName} ` : ''}${lastName} already has an account.`;

  //   check is that user already exist or not
  if (user) {
    throw new AppError(409, existsErrorMessage);
  }

  const result = await userModel.create(payload);
  return result;
};

export const userService = {
  createUserService,
};
