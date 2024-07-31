export interface IFullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
export interface ISubUserUser {
  name: IFullName;
  email: string;
  role: 'user' | 'manager' | 'admin';
}

export interface IUserMethods extends Model<IUser> {
  isUserExists(email: string): Promise<IUser | null>;
}
