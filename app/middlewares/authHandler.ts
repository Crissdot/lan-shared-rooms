import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { getUserFromToken } from '../utils/tokenValidator';

const tokenBasedAuth = async (req: Request, res: Response, next: NextFunction) => {
  const isValidToken = await getUserFromToken(req.header('Token-Auth'));
  if (!isValidToken) {
    return next(createError.Forbidden('You need to login first'));
  }
  return next();
}

const optionalLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Token-Auth');
  if (!token) {
    return next();
  }

  const isValidToken = await getUserFromToken(token);
  if (!isValidToken) {
    return next(createError.Forbidden('You need to send a valid token'));
  }
  return next();
}

export { tokenBasedAuth, optionalLogin };
