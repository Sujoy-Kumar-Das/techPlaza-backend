import { userModel } from '../modules/user/user.model';

const generatePassword = async (role: string) => {
  const allManagers = await userModel.find({ role });
  const password = `${role}${allManagers.length}`;
  return password;
};

export default generatePassword;
