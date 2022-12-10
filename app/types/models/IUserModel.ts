import { BaseModelAttributes } from './IBaseModel';

interface UserModelInput {
  username: string;
  rawPassword: string;
}

interface UserModelAttributes extends UserModelInput, BaseModelAttributes {
  password: string;
}

export { UserModelInput, UserModelAttributes };
