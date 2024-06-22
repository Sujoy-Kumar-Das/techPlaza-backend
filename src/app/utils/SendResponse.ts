import { Response } from 'express';
import TSendResponse from '../interfaces/ISendResponse';

const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
