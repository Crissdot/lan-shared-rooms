import express, { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { errorResponseData } from './responseHandler';

type properties = 'body' | 'query' | 'params';

const validate = (schema: ZodTypeAny, property: properties) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property];
      await schema.parseAsync(data);
      return next();
    } catch (error) {
      const resData = errorResponseData({
        code: 400,
        error: (error as ZodError).issues,
        message: 'Bad request',
      });
      return res.status(resData.code).json(resData);
    }
};

export { validate };
