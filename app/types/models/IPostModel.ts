import { BaseModelAttributes } from './IBaseModel';

interface PostModelInput {
  message: string;
  userId?: number;
}

interface PostModelAttributes extends PostModelInput, BaseModelAttributes {}

export { PostModelInput, PostModelAttributes };
