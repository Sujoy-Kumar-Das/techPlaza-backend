import { userModel } from '../user/user.model';

const loginService = async (data) => {
  const result = await userModel.find({ email: data.email });

  return result;
};
