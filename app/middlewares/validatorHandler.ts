import express, { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject, ZodError } from 'zod';
import { errorResponseData } from './responseHandler';

type properties = 'body' | 'query' | 'params';

const validate = (schema: AnyZodObject, property: properties) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property];
      schema.parse(data);
      return next();
    } catch (error) {
      console.log(error)
      console.log(typeof error)
      const resData = errorResponseData({
        code: 400,
        error: (error as ZodError).issues,
        // message: (error as ZodError).name,
      });
      return res.status(resData.code).json(resData);
    }
};

export { validate };
