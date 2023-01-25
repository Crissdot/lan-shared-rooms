import { BaseModelAttributes } from './IBaseModel';

interface PostModelInput {
  message: string | null;
  filePath: string | null;
  userId?: number;
}

interface PostModelAttributes extends PostModelInput, BaseModelAttributes {}

export { PostModelInput, PostModelAttributes };
