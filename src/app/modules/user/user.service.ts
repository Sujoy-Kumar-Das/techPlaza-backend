import AppError from '../../errors/AppError';
import generatePassword from '../../utils/genaratePasswrod';
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

const createManagerService = async (payload: IUser) => {
  const {
    email,
    name: { firstName, middleName, lastName },
    role,
  } = payload;

  const user = await userModel.isUserExists(email);
  const existsErrorMessage = `${firstName} ${middleName ? `${middleName} ` : ''}${lastName} already has an account.`;

  //   check is that user already exist or not
  if (user) {
    throw new AppError(409, existsErrorMessage);
  }

  const password = await generatePassword('manager');
  payload.role = 'manager';
  payload.password = password;

  const result = await userModel.create(payload);
  return result;
};

const createAdminService = async (payload: IUser) => {
  const {
    email,
    name: { firstName, middleName, lastName },
    role,
  } = payload;

  const user = await userModel.isUserExists(email);
  const existsErrorMessage = `${firstName} ${middleName ? `${middleName} ` : ''}${lastName} already has an account.`;

  //   check is that user already exist or not
  if (user) {
    throw new AppError(409, existsErrorMessage);
  }

  const password = await generatePassword('admin');
  payload.role = 'admin';
  payload.password = password;

  const result = await userModel.create(payload);
  return result;
};

export const userService = {
  createUserService,
  createManagerService,
  createAdminService,
};
