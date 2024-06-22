import { Model } from 'mongoose';

export interface IFullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
export interface IUser {
  name: IFullName;
  email: string;
  password: string;
  isPasswordChange: boolean;
  lastPasswords: string[];
  lastPasswordChangeAt: Date;
  wrongPasswordAttempt: number;
  role: 'user';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface IUserMethods extends Model<IUser> {
  isUserExists(email: string): Promise<IUser | null>;
}
