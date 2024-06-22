import express from 'express';
import sendResponse from '../../utils/SendResponse';
import catchAsync from '../../utils/catchAsync';
const router = express.Router();

router.get(
  '/',
  catchAsync((req, res) => {
    sendResponse(res, {
      message: 'App is running successfully.',
      success: true,
      data: [],
      statusCode: 200,
    });
  }),
);

export const testRoutes = router;
