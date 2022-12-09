import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import { errorResponseData } from '../middlewares/responseHandler';

function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  return next(err);
}

function ormErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if(err instanceof ValidationError) {
    const resData = errorResponseData({
      code: 409,
      error: err.errors,
      message: err.name,
    });
    return res.status(resData.code).json(resData);
  }
  return next(err);
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const resData = errorResponseData({
    error: err.stack,
    message: err.message,
  });
  return res.status(resData.code).json(resData);
}

export { logErrors, ormErrorHandler, errorHandler };
