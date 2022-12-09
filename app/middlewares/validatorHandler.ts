import express, { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';

type properties = 'body' | 'query' | 'params';

const validate = (schema: AnyZodObject, property: properties) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property];
      schema.parse(data);
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};

export { validate };
