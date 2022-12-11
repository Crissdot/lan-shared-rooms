import { BaseModelAttributes } from './IBaseModel';

interface PostModelInput {
  message: string;
}

interface PostModelAttributes extends PostModelInput, BaseModelAttributes {
  userId: number;
}

export { PostModelInput, PostModelAttributes };
