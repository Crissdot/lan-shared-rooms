import { BaseModelAttributes } from './IBaseModel';

interface UserModelInput {
  username: string;
  rawPassword: string;
}

interface UserModelAttributes extends UserModelInput, BaseModelAttributes {
  password: string;
  token: string | null;
}

export { UserModelInput, UserModelAttributes };
