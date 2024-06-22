import { NextFunction, Request, Response } from 'express';

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    success: false,
    message: 'API Not found.',
    error: '',
  });
};

export default notFoundErrorHandler;
