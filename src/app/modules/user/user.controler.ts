import sendResponse from '../../utils/SendResponse';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserService(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully.',
    data: result,
  });
});

export const userController = {
  createUser,
};
