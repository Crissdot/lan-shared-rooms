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

export { tokenBasedAuth };
