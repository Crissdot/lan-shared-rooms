import { Request } from 'express';
import { Query } from 'express-serve-static-core';

export interface TypedRequest<TBody = any, TQuery extends Query = Query> extends Request {
  body: TBody;
  query: TQuery;
}
